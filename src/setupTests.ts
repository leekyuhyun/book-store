import "@testing-library/jest-dom";
import { expect } from "vitest";
import { buildToHaveStyleRule } from "vitest-styled-components";

expect.extend({
    toHaveStyleRule: buildToHaveStyleRule(expect),
});
