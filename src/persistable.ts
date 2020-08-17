export type Persistable = {
  persist: () => void;
};

export function isPersistable(obj: any): obj is Persistable {
  return typeof obj.persist === "function";
}
