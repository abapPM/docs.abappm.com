import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const path = process.argv[2] ?? ".github/workflows/deploy-docs.yml";
const workflow = readFileSync(path, "utf8");
const references = [...workflow.matchAll(/^\s*(?:-\s*)?uses:\s*([^#\r\n]+)/gm)];

assert(references.length > 0, `${path}: no action references found`);

for (const [, value] of references) {
  const reference = value.trim().replace(/^(["'])(.*)\1$/, "$2");
  assert.match(
    reference,
    /^[\w.-]+\/[\w./-]+@[a-f0-9]{40}$/,
    `${path}: action must use a full commit SHA: ${reference}`
  );
}

console.log(`${path}: ${references.length} action references use full commit SHAs`);
