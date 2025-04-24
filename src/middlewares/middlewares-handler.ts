export const middlewaresHandler =
  (...middlewares: Function[]) =>
  (handler: Function) =>
    middlewares.reduceRight((acc, curr) => curr(acc), handler);
