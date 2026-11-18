import { execFileSync } from "node:child_process";

const version = "0.9.0";
const installed = execFileSync("worker-build", ["--version"], { encoding: "utf8" }).trim();
if (installed !== version) {
  throw new Error(`worker-build ${version} required; run: cargo install worker-build --version ${version} --locked`);
}
execFileSync("worker-build", ["--release", "--locked"], { stdio: "inherit" });
