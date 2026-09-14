import { timingSafeEqual } from "node:crypto";

export function isAuthorized(request: Request) {
  const expected = process.env.INTERNAL_API_SECRET;
  if (!expected) return process.env.NODE_ENV !== "production";
  const supplied = request.headers.get("x-api-key") ?? "";
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
