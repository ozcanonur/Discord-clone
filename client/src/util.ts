// TS workaround to avoid 'xx | undefined' issues
// When we know that something is definitely not going to be undefined
export function ensure<T>(
  argument: T | undefined | null,
  message: string = 'This value was promised to be there.'
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
