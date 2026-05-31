import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "./auth";

/** Returns true if the current request has a valid admin session. */
export async function isAuthed(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token);
}
