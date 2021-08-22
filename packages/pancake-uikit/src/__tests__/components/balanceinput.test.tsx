import React from "react";
import { renderWithTheme } from "../../testHelpers";
import BalanceInput from "../../components/BalanceInput/BalanceInput";

const handleChange = jest.fn();

it("renders correctly", () => {
  const { asFragment } = renderWithTheme(<BalanceInput value="14" currencyValue="15 USD" onUserInput={handleChange} />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c1 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: end;
      -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
      justify-content: flex-end;
    }

    .c2 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    .c5 {
      color: #7A6EAA;
      font-size: 12px;
      font-weight: 400;
      line-height: 1.5;
      font-size: 12px;
      text-align: right;
    }

    .c3 {
      background-color: #eeeaf4;
      border: 0;
      border-radius: 16px;
      box-shadow: inset 0px 2px 2px -1px rgba(74,74,104,0.1);
      color: #280D5F;
      display: block;
      font-size: 16px;
      height: 40px;
      outline: 0;
      padding: 0 16px;
      width: 100%;
      border: 1px solid #d7caec;
    }

    .c3::-webkit-input-placeholder {
      color: #7A6EAA;
    }

    .c3::-moz-placeholder {
      color: #7A6EAA;
    }

    .c3:-ms-input-placeholder {
      color: #7A6EAA;
    }

    .c3::placeholder {
      color: #7A6EAA;
    }

    .c3:disabled {
      background-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

    .c3:focus:not(:disabled) {
      box-shadow: 0px 0px 0px 1px #7645D9,0px 0px 0px 4px rgba(118,69,217,0.6);
    }

    .c0 {
      background-color: #eeeaf4;
      border: 1px solid #d7caec;
      border-radius: 16px;
      box-shadow: inset 0px 2px 2px -1px rgba(74,74,104,0.1);
      padding: 8px 16px;
    }

    .c4 {
      background: transparent;
      border-radius: 0;
      box-shadow: none;
      padding-left: 0;
      padding-right: 0;
      text-align: right;
      border: none;
    }

    .c4::-webkit-input-placeholder {
      color: #7A6EAA;
    }

    .c4::-moz-placeholder {
      color: #7A6EAA;
    }

    .c4:-ms-input-placeholder {
      color: #7A6EAA;
    }

    .c4::placeholder {
      color: #7A6EAA;
    }

    .c4:focus:not(:disabled) {
      box-shadow: none;
    }

    <div
        class="c0"
      >
        <div
          class="c1"
        >
          <div
            class=""
          >
            <div
              class="c2"
            >
              <input
                class="c3 c4"
                inputmode="decimal"
                min="0"
                pattern="^[0-9]*[.,]?[0-9]{0,18}$"
                placeholder="0.0"
                scale="md"
                value="14"
              />
            </div>
            <div
              class="c5"
              color="textSubtle"
              font-size="12px"
            >
              15 USD
            </div>
          </div>
        </div>
      </div>
    </DocumentFragment>
  `);
});

it("renders correctly with unit prop", () => {
  const { asFragment } = renderWithTheme(
    <BalanceInput value="14" currencyValue="15 USD" unit="CAKE" onUserInput={handleChange} />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c1 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: end;
      -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
      justify-content: flex-end;
    }

    .c2 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    .c5 {
      color: #280D5F;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
    }

    .c7 {
      color: #7A6EAA;
      font-size: 12px;
      font-weight: 400;
      line-height: 1.5;
      font-size: 12px;
      text-align: right;
    }

    .c3 {
      background-color: #eeeaf4;
      border: 0;
      border-radius: 16px;
      box-shadow: inset 0px 2px 2px -1px rgba(74,74,104,0.1);
      color: #280D5F;
      display: block;
      font-size: 16px;
      height: 40px;
      outline: 0;
      padding: 0 16px;
      width: 100%;
      border: 1px solid #d7caec;
    }

    .c3::-webkit-input-placeholder {
      color: #7A6EAA;
    }

    .c3::-moz-placeholder {
      color: #7A6EAA;
    }

    .c3:-ms-input-placeholder {
      color: #7A6EAA;
    }

    .c3::placeholder {
      color: #7A6EAA;
    }

    .c3:disabled {
      background-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

    .c3:focus:not(:disabled) {
      box-shadow: 0px 0px 0px 1px #7645D9,0px 0px 0px 4px rgba(118,69,217,0.6);
    }

    .c6 {
      margin-left: 4px;
      text-align: right;
      color: #7A6EAA;
      white-space: nowrap;
    }

    .c0 {
      background-color: #eeeaf4;
      border: 1px solid #d7caec;
      border-radius: 16px;
      box-shadow: inset 0px 2px 2px -1px rgba(74,74,104,0.1);
      padding: 8px 16px;
    }

    .c4 {
      background: transparent;
      border-radius: 0;
      box-shadow: none;
      padding-left: 0;
      padding-right: 0;
      text-align: right;
      border: none;
    }

    .c4::-webkit-input-placeholder {
      color: #7A6EAA;
    }

    .c4::-moz-placeholder {
      color: #7A6EAA;
    }

    .c4:-ms-input-placeholder {
      color: #7A6EAA;
    }

    .c4::placeholder {
      color: #7A6EAA;
    }

    .c4:focus:not(:disabled) {
      box-shadow: none;
    }

    <div
        class="c0"
      >
        <div
          class="c1"
        >
          <div
            class=""
          >
            <div
              class="c2"
            >
              <input
                class="c3 c4"
                inputmode="decimal"
                min="0"
                pattern="^[0-9]*[.,]?[0-9]{0,18}$"
                placeholder="0.0"
                scale="md"
                value="14"
              />
              <div
                class="c5 c6"
                color="text"
              >
                CAKE
              </div>
            </div>
            <div
              class="c7"
              color="textSubtle"
              font-size="12px"
            >
              15 USD
            </div>
          </div>
        </div>
      </div>
    </DocumentFragment>
  `);
});

it("renders correctly with unit prop and switchEditingUnits", () => {
  const { asFragment } = renderWithTheme(
    <BalanceInput
      value="14"
      currencyValue="15 USD"
      unit="CAKE"
      switchEditingUnits={jest.fn()}
      onUserInput={handleChange}
    />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c8 {
      padding-left: 12px;
    }

    .c1 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: end;
      -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
      justify-content: flex-end;
    }

    .c2 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    .c12 {
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      fill: #7A6EAA;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .c5 {
      color: #280D5F;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
    }

    .c7 {
      color: #7A6EAA;
      font-size: 12px;
      font-weight: 400;
      line-height: 1.5;
      font-size: 12px;
      text-align: right;
    }

    .c3 {
      background-color: #eeeaf4;
      border: 0;
      border-radius: 16px;
      box-shadow: inset 0px 2px 2px -1px rgba(74,74,104,0.1);
      color: #280D5F;
      display: block;
      font-size: 16px;
      height: 40px;
      outline: 0;
      padding: 0 16px;
      width: 100%;
      border: 1px solid #d7caec;
    }

    .c3::-webkit-input-placeholder {
      color: #7A6EAA;
    }

    .c3::-moz-placeholder {
      color: #7A6EAA;
    }

    .c3:-ms-input-placeholder {
      color: #7A6EAA;
    }

    .c3::placeholder {
      color: #7A6EAA;
    }

    .c3:disabled {
      background-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

    .c3:focus:not(:disabled) {
      box-shadow: 0px 0px 0px 1px #7645D9,0px 0px 0px 4px rgba(118,69,217,0.6);
    }

    .c9 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border: 0;
      border-radius: 16px;
      box-shadow: 0px -1px 0px 0px rgba(14,14,44,0.4) inset;
      cursor: pointer;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      font-family: inherit;
      font-size: 16px;
      font-weight: 600;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-letter-spacing: 0.03em;
      -moz-letter-spacing: 0.03em;
      -ms-letter-spacing: 0.03em;
      letter-spacing: 0.03em;
      line-height: 1;
      opacity: 1;
      outline: 0;
      -webkit-transition: background-color 0.2s,opacity 0.2s;
      transition: background-color 0.2s,opacity 0.2s;
      height: 32px;
      padding: 0 16px;
      background-color: transparent;
      color: #1FC7D4;
      box-shadow: none;
    }

    .c9:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
      opacity: 0.65;
    }

    .c9:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
      opacity: 0.85;
      -webkit-transform: translateY(1px);
      -ms-transform: translateY(1px);
      transform: translateY(1px);
      box-shadow: none;
    }

    .c9:disabled,
    .c9.pancake-button--disabled {
      background-color: #E9EAEB;
      border-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

    .c10 {
      padding: 0;
      width: 32px;
    }

    .c11 {
      width: 16px;
    }

    .c6 {
      margin-left: 4px;
      text-align: right;
      color: #7A6EAA;
      white-space: nowrap;
    }

    .c0 {
      background-color: #eeeaf4;
      border: 1px solid #d7caec;
      border-radius: 16px;
      box-shadow: inset 0px 2px 2px -1px rgba(74,74,104,0.1);
      padding: 8px 16px;
    }

    .c4 {
      background: transparent;
      border-radius: 0;
      box-shadow: none;
      padding-left: 0;
      padding-right: 0;
      text-align: right;
      border: none;
    }

    .c4::-webkit-input-placeholder {
      color: #7A6EAA;
    }

    .c4::-moz-placeholder {
      color: #7A6EAA;
    }

    .c4:-ms-input-placeholder {
      color: #7A6EAA;
    }

    .c4::placeholder {
      color: #7A6EAA;
    }

    .c4:focus:not(:disabled) {
      box-shadow: none;
    }

    <div
        class="c0"
      >
        <div
          class="c1"
        >
          <div
            class=""
          >
            <div
              class="c2"
            >
              <input
                class="c3 c4"
                inputmode="decimal"
                min="0"
                pattern="^[0-9]*[.,]?[0-9]{0,18}$"
                placeholder="0.0"
                scale="md"
                value="14"
              />
              <div
                class="c5 c6"
                color="text"
              >
                CAKE
              </div>
            </div>
            <div
              class="c7"
              color="textSubtle"
              font-size="12px"
            >
              15 USD
            </div>
          </div>
          <div
            class="c8 c2"
          >
            <button
              class="c9 c10 c11"
              scale="sm"
            >
              <svg
                class="c12"
                color="textSubtle"
                viewBox="0 0 24 25"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 17.01V11C16 10.45 15.55 10 15 10C14.45 10 14 10.45 14 11V17.01H12.21C11.76 17.01 11.54 17.55 11.86 17.86L14.65 20.64C14.85 20.83 15.16 20.83 15.36 20.64L18.15 17.86C18.47 17.55 18.24 17.01 17.8 17.01H16ZM8.65003 3.35002L5.86003 6.14002C5.54003 6.45002 5.76003 6.99002 6.21003 6.99002H8.00003V13C8.00003 13.55 8.45003 14 9.00003 14C9.55003 14 10 13.55 10 13V6.99002H11.79C12.24 6.99002 12.46 6.45002 12.14 6.14002L9.35003 3.35002C9.16003 3.16002 8.84003 3.16002 8.65003 3.35002Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </DocumentFragment>
  `);
});
