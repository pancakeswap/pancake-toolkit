import React from "react";
import { renderWithTheme } from "../../testHelpers";
import Heading from "../../components/Heading/Heading";

it("renders correctly", () => {
  const { asFragment } = renderWithTheme(<Heading>Title</Heading>);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      color: #452A7A;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
    }

    .c1 {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.1;
    }

    @media screen and (min-width:968px) {
      .c1 {
        font-size: 20px;
      }
    }

    <h2
        class="c0 c1"
        color="text"
      >
        Title
      </h2>
    </DocumentFragment>
  `);
});
