import { getItem, removeItem, setItem } from "@/lib/storage";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type StoredAuthRecord =
  | AuthUser
  | {
      user: AuthUser;
      createdAt: number;
    };

const AUTH_KEY = "foodapp:auth";

let memoryUser: AuthUser | null = null;

export async function loadAuthUser(): Promise<AuthUser | null> {
  if (memoryUser) return memoryUser;
  const raw = await getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredAuthRecord;
    if (isAuthUser(parsed)) {
      memoryUser = parsed;
      return memoryUser;
    }
    if (isStoredAuthRecord(parsed)) {
      memoryUser = parsed.user;
      return memoryUser;
    }
    await removeItem(AUTH_KEY);
    return memoryUser;
  } catch {
    await removeItem(AUTH_KEY);
    return null;
  }
}

export async function signInMock(email: string, password: string): Promise<AuthUser> {
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!validatePassword(password)) {
    throw new Error("Password must be at least 6 characters.");
  }

  const user: AuthUser = {
    id: "u_1",
    name: "Alex Morgan",
    email: normalizedEmail,
  };
  memoryUser = user;
  await setItem(
    AUTH_KEY,
    JSON.stringify({
      user,
      createdAt: Date.now(),
    }),
  );
  return user;
}

export async function signOutMock(): Promise<void> {
  memoryUser = null;
  await removeItem(AUTH_KEY);
}

export function getCachedAuthUser(): AuthUser | null {
  return memoryUser;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  return password.trim().length >= 6;
}

function isAuthUser(value: unknown): value is AuthUser {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "email" in value &&
    typeof (value as AuthUser).id === "string" &&
    typeof (value as AuthUser).name === "string" &&
    typeof (value as AuthUser).email === "string"
  );
}

function isStoredAuthRecord(value: unknown): value is { user: AuthUser; createdAt: number } {
  return (
    typeof value === "object" &&
    value !== null &&
    "user" in value &&
    "createdAt" in value &&
    isAuthUser((value as { user?: unknown }).user) &&
    typeof (value as { createdAt?: unknown }).createdAt === "number"
  );
}
