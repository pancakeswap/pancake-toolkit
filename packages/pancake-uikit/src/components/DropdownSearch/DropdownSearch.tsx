import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Input } from "../Input";
import { Text } from "../Text";
import { ArrowDropDownIcon } from "../Svg";
import { DropdownSearchOptionProps, DropdownSearchProps } from "./types";

const StyledInput = styled(Input)`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
  margin-left: auto;
`

const DropDownHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.input};
  transition: border-radius 0.15s;
`

const DropDownListContainer = styled.div`
  min-width: 136px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.input};
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }
`

const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number }>`
  cursor: pointer;
  width: ${({ width }) => width}px;
  position: relative;
  background: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  height: 40px;
  min-width: 136px;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        border-radius: 16px 16px 0 0;
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        border-top-width: 0;
        border-radius: 0 0 16px 16px;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
      }

      ${StyledInput} {
        border-radius: 16px 16px 0 0;
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  &:hover {
    background: ${({ theme }) => theme.colors.inputSecondary};
  }
`

const Select: React.FunctionComponent<DropdownSearchProps> = ({ options, onChange }) => {
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [content, setContent] = useState(options)

  const toggling = () => setIsOpen(!isOpen)

  const onOptionClicked = (option: DropdownSearchOptionProps) => () => {
    setSelectedOption(option)
    setIsOpen(false)

    if (onChange) {
      onChange(option)
      setContent(options)
      searchRef.current?.value = option.label
    }
  }

  useEffect(() => {
    setContainerSize({
      width: dropdownRef.current?.offsetWidth, // Consider border
      height: dropdownRef.current?.offsetHeight,
    })
  }, [])

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredContent = options.filter((option) =>
      option.label.toLowerCase().includes(event.target.value.toLowerCase()))

    if (filteredContent !== undefined) {
      setIsOpen(true)
      setContent(filteredContent)
    }
  }

  return (
    <DropDownContainer isOpen={isOpen} {...containerSize}>
      {containerSize.width !== 0 && (
        <StyledInput
          ref={searchRef}
          defaultValue={selectedOption.label}
          onChange={handleChangeQuery}
          placeholder="Hint Text"
        />
      )}
      <ArrowDropDownIcon color="text" onClick={toggling} />
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {content.map((option) =>
             <ListItem onClick={onOptionClicked(option)} key={option.label}>
              <Text>{option.label}</Text>
            </ListItem>,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select
