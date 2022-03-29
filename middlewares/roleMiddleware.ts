import { Context, Status } from "../deps.ts";
import { users } from "../models/Users.ts";
import { getUsername } from "../Helpers/getUser.ts";
import type { UserSchema } from "../models/Users.ts";

const roleCheck = (isAdmin: boolean) => {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    try {
      const { iss } = await getUsername(ctx);
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
