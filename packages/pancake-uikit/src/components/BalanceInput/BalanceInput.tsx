import React from "react";
import { Flex } from "../Box";
import Text from "../Text/Text";
import { StyledBalanceInput, StyledInput } from "./styles";
import { BalanceInputProps } from "./types";

const BalanceInput: React.FC<BalanceInputProps> = ({
  value,
  placeholder = "0.0",
  onUserInput,
  currencyValue,
  inputProps,
  innerRef,
  isWarning = false,
  decimals = 18,
  unit,
  ...props
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, "."));
    }
  };

  return (
    <StyledBalanceInput isWarning={isWarning} {...props}>
      <Flex alignItems="center">
        <StyledInput
          pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
          inputMode="decimal"
          min="0"
          value={value}
          onChange={handleOnChange}
          placeholder={placeholder}
          ref={innerRef}
          {...inputProps}
        />
        {unit && (
          <Text ml="4px" textAlign="right" color="textSubtle">
            {unit}
          </Text>
        )}
      </Flex>
      {currencyValue && (
        <Text fontSize="12px" textAlign="right" color="textSubtle">
          {currencyValue}
        </Text>
      )}
    </StyledBalanceInput>
  );
};

export default BalanceInput;
