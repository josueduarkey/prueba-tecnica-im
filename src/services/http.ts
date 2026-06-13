const DEFAULT_DELAY = 600;

export function simulateRequest<T>(data: T, delay = DEFAULT_DELAY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

export function simulateError(message: string, delay = DEFAULT_DELAY): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(message)), delay)
  );
}
