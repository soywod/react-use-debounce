import {Persistable} from "./persistable.types";

export function isPersistable(obj: any): obj is Persistable {
  if (typeof obj !== "object") return false;
  if (typeof obj.persist !== "function") return false;
  return true;
}
