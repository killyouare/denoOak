import { Context, Status } from "../deps.ts";
const fieldsCheck = (fields: string[]) => {
  return async (
    ctx: Context,
    next: () => Promise<unknown>,
  ) => {
    try {
      const request = ctx.request.body();
      const body = await request.value;

      const errors: string[] = [];
      fields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(body, field)) {
          errors.push(`Request does not have a ${field} field`);
        }
      });
      if (errors.length) {
        throw {
          code: Status.BadRequest,
          msg: "Validation errors",
          errors,
        };
      }
      await next();
    } catch ({ errors, msg, code }) {
      ctx.response.status = code;
      return ctx.response.body = {
        error: { msg, errors },
      };
    }
  };
};
export { fieldsCheck };
