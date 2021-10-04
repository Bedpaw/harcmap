export const promiseUtils = {
  timeout (timeout: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), timeout);
    });
  },
};
