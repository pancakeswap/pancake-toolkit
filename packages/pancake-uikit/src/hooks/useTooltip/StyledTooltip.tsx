import styled, { css } from "styled-components";

export const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    z-index: -1;
  }

  &::before {
    content: "";
    transform: rotate(45deg);
    background: ${({ theme }) => theme.tooltip.background};
  }
`;

export const StyledTooltip = styled.div`
  ${() => css`
    padding: 16px; // Figma ✔️
    font-size: 16px; // Figma ✔️ Use pre-defined
    line-height: 130%; // Figma ✔️ Use pre-defined
    border-radius: 16px; // Figma ✔️
    max-width: 320px;
    background: ${({ theme }) => theme.tooltip.background};
    color: ${({ theme }) => theme.tooltip.text};
    box-shadow: ${({ theme }) => theme.tooltip.boxShadow};

    &[data-popper-placement^="top"] > ${Arrow} {
      bottom: -4px;
    }

    &[data-popper-placement^="bottom"] > ${Arrow} {
      top: -4px;
    }

    &[data-popper-placement^="left"] > ${Arrow} {
      right: -4px;
    }

    &[data-popper-placement^="right"] > ${Arrow} {
      left: -4px;
    }
  `}
`;
