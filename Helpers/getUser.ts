import { KEY } from "../config.ts";
import { Context, verify } from "../deps.ts";

const getUsername = async (ctx: Context) => {
  const token: string | undefined = ctx.request.headers.get(
    "Authorization",
  )?.replace(`Bearer `, "");
  return verify(
    token ? token : "",
    KEY,
  );
}; 
export {
  getUsername
}