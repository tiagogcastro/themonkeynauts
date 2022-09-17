export const delay = (ms: number) =>
  new Promise<any>(resolve => {
    setTimeout(resolve, ms);
  });
