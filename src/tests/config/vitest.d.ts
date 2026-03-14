/// <reference types="vitest/globals" />

declare namespace jest {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Matchers<R, T> {
    toHaveNoViolations(): R;
  }
}
