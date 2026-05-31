import { test, expect, beforeAll } from "vitest";
import { signSession, verifySession } from "./auth";

beforeAll(() => { process.env.SESSION_SECRET = "test-secret-test-secret-32chars!!"; });

test("round-trips a valid session", async () => {
  const token = await signSession({ exp: Date.now() + 10_000 });
  expect(await verifySession(token)).toBe(true);
});
test("rejects tampered token", async () => {
  const token = await signSession({ exp: Date.now() + 10_000 });
  expect(await verifySession(token.slice(0, -2) + "xx")).toBe(false);
});
test("rejects expired token", async () => {
  const token = await signSession({ exp: Date.now() - 1 });
  expect(await verifySession(token)).toBe(false);
});
test("rejects garbage", async () => {
  expect(await verifySession("not.a.token")).toBe(false);
  expect(await verifySession("")).toBe(false);
});
