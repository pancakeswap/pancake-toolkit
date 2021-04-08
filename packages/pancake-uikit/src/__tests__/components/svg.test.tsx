import React from "react";
import { renderWithTheme } from "../../testHelpers";
import { Svg } from "../../components/Svg";

it("renders correctly", () => {
  const { asFragment } = renderWithTheme(
    <Svg viewBox="0 0 24 24">
      <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" />
    </Svg>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      fill: #452A7A;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    <svg
        class="c0"
        color="text"
        viewBox="0 0 24 24"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
        />
      </svg>
    </DocumentFragment>
  `);
});
