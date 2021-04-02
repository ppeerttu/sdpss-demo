import { RouterContext } from "../deps.ts";

interface RequestParam {
  key: string;
  type: "string" | "number" | "boolean";
  optional?: boolean;
}

export const validate = async (
  ctx: RouterContext,
  params: RequestParam[],
): Promise<boolean> => {
  if (!ctx.request.hasBody) {
    return false;
  }
  const body = await ctx.request.body({ type: "json" }).value;
  return !body ? false : params.every((param) => matches(param, body));
};

const matches = (param: RequestParam, body: any): boolean => {
  const val = body[param.key];
  if (typeof val === param.type) {
    return true;
  }
  return isNullOrUndefined(val) && !!param.optional;
};

const isNullOrUndefined = (val: any): boolean =>
  val === null || typeof val === "undefined";
