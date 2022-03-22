import type { Header } from "./deps.ts";
import { config } from "./deps.ts";
const { PORT, HOST, URI } = config();
const KEY = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
const HEADER: Header = {
  alg: "HS512",
  typ: "JWT",
};
export { HEADER, HOST, KEY, PORT, URI };
