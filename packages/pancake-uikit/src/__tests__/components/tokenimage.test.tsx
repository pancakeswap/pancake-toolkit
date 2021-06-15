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
      position: relative;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 48px;
      max-width: 48px;
      max-height: 48px;
      width: 100%;
      padding-top: 0%;
    }

    .c1 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-origin: border-box;
      border: 2px solid rgba(0,0,0,0.25);
      border-radius: 50%;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      height: 48px;
      width: 48px;
      z-index: 5;
    }

    <div
        class="c0 c1"
        height="48"
        width="48"
      />
    </DocumentFragment>
  `);
});
