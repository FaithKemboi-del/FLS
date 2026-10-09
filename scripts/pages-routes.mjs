import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const html = readFileSync(join(dist, "index.html"), "utf8");
const routes = ["practice", "consultation", "contact", "book"];

for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

writeFileSync(join(dist, "404.html"), html);
