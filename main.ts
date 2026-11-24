// Post the Meme, Win the Feed — entry program.
// Reads POST.json (the public X post URL for the meme), validates it is a
// real https://x.com/WuYuanJie17/status/<digits> URL, and copies POST.json
// verbatim to /output/POST.json. A PLACEHOLDER URL is refused with exit 1,
// so the entry can only run once the meme has actually been posted.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const POST_URL_PATTERN = /^https:\/\/x\.com\/WuYuanJie17\/status\/\d+$/;

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

const repoDir = dirname(fileURLToPath(import.meta.url));
const postPath = join(repoDir, "POST.json");

let raw: string;
try {
  raw = readFileSync(postPath, "utf8");
} catch {
  fail(`cannot read POST.json at ${postPath}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw!);
} catch {
  fail("POST.json is not valid JSON");
}

const url =
  parsed !== null && typeof parsed === "object"
    ? (parsed as Record<string, unknown>).url
    : undefined;
if (typeof url !== "string") {
  fail("POST.json must hold a string field 'url'");
}
if (url.includes("PLACEHOLDER")) {
  fail("POST.json still holds the PLACEHOLDER URL — post the meme first");
}
if (!POST_URL_PATTERN.test(url)) {
  fail(`post URL is not a real x.com/WuYuanJie17 status URL: ${url}`);
}
const statusId = url.split("/status/")[1]!;
if (statusId.length < 10) {
  fail(`status ID looks too short to be a real post: ${statusId}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/POST.json", raw, "utf8");

// Self-check: re-read what was written and verify it byte-for-byte.
const onDisk = readFileSync("/output/POST.json", "utf8");
if (onDisk.length !== raw.length) {
  fail(`/output/POST.json is ${onDisk.length} bytes, POST.json is ${raw.length}`);
}
if (onDisk !== raw) {
  fail("/output/POST.json does not match POST.json byte-for-byte");
}
const onDiskParsed = JSON.parse(onDisk) as Record<string, unknown>;
if (onDiskParsed.url !== url || !POST_URL_PATTERN.test(onDiskParsed.url as string)) {
  fail("/output/POST.json failed re-validation on disk");
}
console.log(`self-check passed: post URL ${url}`);
console.log("wrote /output/POST.json");
