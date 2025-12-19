// lib/logger.ts
export const logEvent = (message: string) => {
  console.log(`[SECURITY LOG] ${new Date().toISOString()} - ${message}`);
};
