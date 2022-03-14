import { Context, Status, verify } from "../deps.ts";
import { KEY } from "../config.ts";
const authCheck = async (ctx: Context, next: Function) => {
  try {
    const token: string | undefined = ctx.request.headers.get(
      "Authorization",
    )?.replace(`Bearer `, "");
    await verify(token ? token : "", KEY);
    await next();
  } catch (e) {
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { error: { msg: "Unauthorized" } };
  }
};
export { authCheck };
