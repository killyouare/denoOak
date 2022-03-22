import { Context, Payload, Status, verify } from "../deps.ts";
import { KEY } from "../config.ts";
import { users } from "../models/Users.ts";
import type { UserSchema } from "../models/Users.ts";

const roleCheck = (isAdmin: boolean) => {
  return async (ctx: Context, next: Function) => {
    try {
      const token: string | undefined = ctx.request.headers.get(
        "Authorization",
      )?.replace(`Bearer `, "");
      const { iss }: Payload = await verify(
        token ? token : "",
        KEY,
      );
      const user: UserSchema | undefined = await users.findOne({
        username: iss,
      });
      if (user?.is_admin != isAdmin) {
        ctx.response.body = { error: { msg: "Forbidden for you." } };
        ctx.response.status = Status.Forbidden;
        return;
      }
      await next();
    } catch {
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = { error: { msg: "Unauthorized" } };
    }
  };
};
export { roleCheck };
