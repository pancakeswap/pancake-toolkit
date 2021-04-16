import React, { useState } from "react";
import Box from "../Box/Box";
import BalanceInput from "./BalanceInput";

export default {
  title: "Components/BalanceInput",
  component: BalanceInput,
  argTypes: {},
};

export const Default: React.FC = () => {
  const [decimalValue, setDecimalValue] = useState(1.43333);
  const [numericValue, setNumericValue] = useState(5);

  const currencyValue = (input: number) => {
    return `~${(input * 1.3).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`;
  };

  const handleDecimalChange = (evt) => {
    setDecimalValue(evt.target.value);
  };

  const handleNumericChange = (evt) => {
    setNumericValue(evt.target.value);
  };

  return (
    <Box width="300px">
      <BalanceInput
        value={decimalValue}
        currencyValue={currencyValue(decimalValue)}
        onChange={handleDecimalChange}
        placeholder="0.0"
        mb="32px"
      />
      <BalanceInput
        value={decimalValue * 1.5}
        currencyValue={currencyValue(decimalValue * 1.5)}
        onChange={handleDecimalChange}
        placeholder="1.5"
        isWarning
        mb="32px"
      />
      <BalanceInput
        value={numericValue}
        inputProps={{ inputMode: "numeric" }}
        currencyValue={currencyValue(numericValue)}
        onChange={handleNumericChange}
        placeholder="0"
        mb="32px"
      />
    </Box>
  );
};
