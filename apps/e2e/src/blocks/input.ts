import { Locator } from "@playwright/test";

export type Input = {
  label: Locator;
  error: Locator;
  input: Locator;
};

export function createInput(locator: Locator): Input {
  return {
    label: locator.getByTestId("label"),
    error: locator.getByTestId("error"),
    input: locator.getByTestId("input"),
  };
}
