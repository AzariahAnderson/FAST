import "server-only";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const dir = path.resolve(process.env.DATA_DIR ?? ".data");
const file = path.join(dir, "waitlist.ndjson");
let queue: Promise<unknown> = Promise.resolve();

/** Appends an email once. Writes are serialised and the folder/file are owner-only. */
export function addToWaitlist(email: string): Promise<void> {
  const job = queue.then(async () => {
    await mkdir(dir, { recursive: true, mode: 0o700 });
    let existing = "";
    try { existing = await readFile(file, "utf8"); } catch { /* first write */ }
    if (existing.includes(`"email":${JSON.stringify(email)}`)) return;
    await appendFile(file, JSON.stringify({ email, at: new Date().toISOString() }) + "\n", { mode: 0o600 });
  });
  queue = job.catch(() => undefined);
  return job;
}
