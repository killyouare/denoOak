import { KEY } from "../config.ts";
import { Context, Payload, verify } from "../deps.ts";

const getUsername = (ctx: Context): Promise<Payload> => {
  const token: string | undefined = ctx.request.headers.get(
    "Authorization",
  )?.replace(`Bearer `, "");
  return verify(
    token ?? "",
    KEY,
  );
};
export { getUsername };
