export function replaceToShortString(string: string) {
  return string.replace(/^(\w{3}).*(\w{3})$/, '$1...$2');
}