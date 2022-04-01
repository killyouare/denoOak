import { Context, ObjectId, Status, verify } from "../deps.ts";
import { KEY } from "../config.ts";
import { users } from "../models/Users.ts";
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
    console.log(iss);
    const user = await users.findOne({ _id: new ObjectId(iss) });
    if (user == undefined) throw {};

    console.log("qwe");
    await next();
  } catch {
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = { error: { msg: "Unauthorized" } };
  }
};
export { getUser };
