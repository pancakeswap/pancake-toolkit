import React from "react";
import { renderWithTheme, setupMockIntersectionObserver } from "../../testHelpers";
import TokenImage from "../../components/Image/TokenImage";

it("renders correctly", () => {
  setupMockIntersectionObserver();
  const { asFragment } = renderWithTheme(
    <TokenImage tokenAddress="0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82" height={48} width={48} />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      height: 100%;
      max-height: 48px;
      max-width: 48px;
      position: relative;
      width: 100%;
    }

    .c0:before {
      content: "";
      display: block;
      padding-top: 100%;
      width: 100%;
    }

    .c2 {
      bottom: 0;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    }

    .c1 {
      background-origin: border-box;
      border: 1px solid rgba(0,0,0,0.25);
      border-radius: 50%;
    }

    <div
        class="c0 c1"
      >
        <div
          class="c2"
        />
      </div>
    </DocumentFragment>
  `);
});
