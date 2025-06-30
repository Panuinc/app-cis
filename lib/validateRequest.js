import logger from "@/lib/logger";
import { RateLimiterMemory } from "rate-limiter-flexible";

export function getRequestIP(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.ip || "unknown";
}

export function verifySecretToken(headers, ip = "unknown") {
  const secretToken = headers.get("secret-token")?.trim();
  const expectedToken = process.env.SECRET_TOKEN?.trim();

  if (!secretToken || secretToken !== expectedToken) {
    const error = new Error("Access Denied Due To An Invalid Or Missing Token");
    error.status = 401;
    logger.warn({
      message: "Access Denied Due To An Invalid Or Missing Token",
      ip,
      receivedToken: secretToken,
    });
    throw error;
  }
}

const rateLimiter = new RateLimiterMemory({
  points: 1000000,
  duration: 60,
});

export const checkRateLimit = async (ip) => {
  try {
    await rateLimiter.consume(ip);
  } catch (error) {
    if (error?.msBeforeNext) {
      logger.warn({
        message: "Rate limit exceeded",
        ip,
        retryAfterMs: error.msBeforeNext,
      });
      const err = new Error("Too many requests. Please try again later.");
      err.status = 429;
      throw err;
    }
    throw error;
  }
};

export async function validateRequest(request) {
  const ip = getRequestIP(request);
  verifySecretToken(request.headers, ip);
  await checkRateLimit(ip);
  return ip;
}
