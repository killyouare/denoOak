import type { Header } from "./deps.ts";
const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";
const URI =
  "mongodb+srv://course:course@cluster0.qpysx.mongodb.net/test?authMechanism=SCRAM-SHA-1";
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
