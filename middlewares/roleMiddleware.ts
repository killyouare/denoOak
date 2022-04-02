import { Context, Status } from "../deps.ts";
import { UserSchema } from "../models/Users.ts";

const roleCheck = (isAdmin: boolean) => {
  return async (
    ctx: Context,
    next: () => Promise<unknown>,
  ) => {
    try {
      const user: UserSchema = ctx.app.state.user;
      if (user.is_admin != isAdmin) {
        ctx.throw(Status.Forbidden);
      }
      await next();
    } catch {
      ctx.response.status = Status.Forbidden;
      ctx.response.body = { error: { msg: "Forbidden for you." } };
    }
  };
};
export { roleCheck };
