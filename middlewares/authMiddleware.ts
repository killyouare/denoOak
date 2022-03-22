import { Context, Status, verify } from "../deps";
import { KEY } from "../config";
const authCheck = async (
  ctx: Context<Record<string, unknown>>,
  next: Function,
) => {
  try {
    const token: string | undefined = ctx.request.headers.get(
      "Authorization",
    )?.replace(`Bearer `, "");
    await verify(token ? token : "", KEY);
    await next();
  } catch {
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { error: { msg: "Unauthorized" } };
  }
};
export { authCheck };
