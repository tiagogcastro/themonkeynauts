export function verifyRole<T extends string>(type: T, rolesArgs: Record<T, string>) {
  const roles: Record<T, string> = rolesArgs;

  return roles[type.toLowerCase() as T];
}
