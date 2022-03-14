import { Request, Response } from "./deps.ts";
interface rq {
  request: Request;
}
interface rs {
  response: Response;
}
interface rr {
  request: Request;
  response: Response;
}
interface rrn {
  request: Request;
  response: Response;
  next: Function;
}
export type { rq, rr, rrn, rs };
