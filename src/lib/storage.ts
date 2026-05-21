import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

type Backend = "async-storage" | "local-storage" | "memory";

const memoryStorage = new Map<string, string>();
let backend: Backend | null = null;
let detectionPromise: Promise<Backend> | null = null;

async function detectBackend(): Promise<Backend> {
  if (backend) return backend;
  if (!detectionPromise) {
    detectionPromise = (async () => {
      if (Platform.OS === "web") {
        try {
          const probeKey = "__foodapp_storage_probe__";
          localStorage.setItem(probeKey, "1");
          localStorage.removeItem(probeKey);
          backend = "local-storage";
          return backend;
        } catch {
          backend = "memory";
          return backend;
        }
      }

      try {
        await AsyncStorage.getItem("__foodapp_storage_probe__");
        backend = "async-storage";
        return backend;
      } catch {
        backend = "memory";
        return backend;
      }
    })();
  }

  return detectionPromise;
}

export async function getItem(key: string): Promise<string | null> {
  const storageBackend = await detectBackend();

  if (storageBackend === "local-storage") {
    return localStorage.getItem(key);
  }

  if (storageBackend === "async-storage") {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      backend = "memory";
      return memoryStorage.get(key) ?? null;
    }
  }

  return memoryStorage.get(key) ?? null;
}

export async function setItem(key: string, value: string): Promise<void> {
  const storageBackend = await detectBackend();

  if (storageBackend === "local-storage") {
    localStorage.setItem(key, value);
    return;
  }

  if (storageBackend === "async-storage") {
    try {
      await AsyncStorage.setItem(key, value);
      return;
    } catch {
      backend = "memory";
    }
  }

  memoryStorage.set(key, value);
}

export async function removeItem(key: string): Promise<void> {
  const storageBackend = await detectBackend();

  if (storageBackend === "local-storage") {
    localStorage.removeItem(key);
    return;
  }

  if (storageBackend === "async-storage") {
    try {
      await AsyncStorage.removeItem(key);
      return;
    } catch {
      backend = "memory";
    }
  }

  memoryStorage.delete(key);
}
