import { Context, ObjectId, Status, verify } from "../deps.ts";
import { KEY } from "../config.ts";
import { users } from "../models/Users.ts";
import { etag } from "../deps.ts";
const getUser = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  try {
    const token: string | undefined = ctx.request.headers.get(
      "Authorization",
    )?.replace(`Bearer `, "");

    const { iss } = await verify(
      token ?? "",
      KEY,
    );
    const user = await users.findOne({ _id: new ObjectId(iss) });
    if (user == undefined) ctx.throw(Status.Unauthorized);

    ctx.app.state.user = {
      _id: user._id,
      username: user.username,
      is_admin: user.is_admin,
      cart: user.cart,
    };

    await next();
  } catch {
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { error: { msg: "Unauthorized" } };
  }
};
export { getUser };
