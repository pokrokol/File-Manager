import path from "path";

export function resolveAbsolutePath(abspath) {
  return path.isAbsolute(abspath) ? abspath : path.join(process.cwd(), abspath);
}
