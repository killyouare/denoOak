import { Context, Status } from "../deps.ts";

const fieldsCheck = (fields: string[]) => {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    try {
      if (!ctx.request.hasBody) {
        ctx.throw(Status.BadRequest, "Bad Request");
      }

      const request = ctx.request.body();
      const body = await request.value;

      fields.forEach((field) => {
        if (!field.includes(body)) {
          return ctx.throw(Status.BadRequest, "Bad Request");
        }
      });

      next();
    } catch {
      return ctx.throw(Status.BadRequest, "Bad Request");
    }
  };
};
export { fieldsCheck };
