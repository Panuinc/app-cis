import { NextResponse } from "next/server";
import logger from "@/lib/logger";

export function handleRateLimitExceeded(ip) {
  logger.warn({
    message: "Too many requests",
    ip,
  });
  return NextResponse.json(
    { error: "Too many requests, please try again later" },
    { status: 429 }
  );
}

export function handleZodError(error) {
  logger.error({
    message: "Invalid data",
    errorName: error.name,
    details: error.errors,
  });

  return NextResponse.json(
    {
      error: "Invalid data",
      details: error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    },
    { status: 400 }
  );
}

export function handleUnauthorizedError() {
  logger.warn({ message: "Unauthorized access" });
  return NextResponse.json({ error: "Access denied" }, { status: 401 });
}

export function handleGenericError(error, context = "An error occurred") {
  logger.error({
    message: context,
    errorMessage: error?.message,
    stack: error?.stack,
  });

  return NextResponse.json(
    {
      error: context,
      ...(process.env.NODE_ENV === "development" && error?.message
        ? { message: error.message }
        : {}),
    },
    { status: 500 }
  );
}

export function handleErrors(error, ip, context = "An error occurred") {
  if (error?.message === "RateLimitExceeded")
    return handleRateLimitExceeded(ip);
  if (error?.name === "ZodError") return handleZodError(error);
  if (error?.status === 401) return handleUnauthorizedError();
  return handleGenericError(error, context);
}

export function handleGetErrors(error, ip, context = "An error occurred") {
  if (error?.message === "RateLimitExceeded")
    return handleRateLimitExceeded(ip);
  if (error?.status === 401) return handleUnauthorizedError();
  return handleGenericError(error, context);
}
