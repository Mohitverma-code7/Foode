import { getItem, removeItem, setItem } from "@/lib/storage";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

const AUTH_KEY = "foodapp:auth";

let memoryUser: AuthUser | null = null;

export async function loadAuthUser(): Promise<AuthUser | null> {
  if (memoryUser) return memoryUser;
  const raw = await getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    memoryUser = JSON.parse(raw) as AuthUser;
    return memoryUser;
  } catch {
    return null;
  }
}

export async function signInMock(email: string): Promise<AuthUser> {
  // Mock user. In a real app, you would call an API.
  const user: AuthUser = {
    id: "u_1",
    name: "Alex Morgan",
    email,
  };
  memoryUser = user;
  await setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export async function signOutMock(): Promise<void> {
  memoryUser = null;
  await removeItem(AUTH_KEY);
}

export function getCachedAuthUser(): AuthUser | null {
  return memoryUser;
}
