import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import Grid from "../../components/Box/Grid";
import Box from "../../components/Box/Box";
import getThemeValue from "../../util/getThemeValue";
import Text from "../../components/Text/Text";
import Heading from "../../components/Heading/Heading";
import { Button } from "../../components/Button";
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from "../Modal";
import WalletCard, { MoreWalletCard } from "./WalletCard";
import config from "./config";
import { Login, Config } from "./types";

interface Props {
  login: Login;
  onDismiss?: () => void;
  displayCount?: number;
}

const WalletWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const sortedConfig = config.sort((a, b) => a.priority - b.priority);

/**
 * Trust Wallet is not supported on iOS. Default to Wallet Connect
 */
const getSupportedWallet = (wallet: Config) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (wallet.title === "Trust Wallet" && isIOS) {
    const walletConnect = config.find((configItem) => configItem.title === "WalletConnect");

    if (walletConnect) {
      return walletConnect;
    }
  }

  return wallet;
};

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null, displayCount = 3 }) => {
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const displayListConfig = showMore ? sortedConfig : sortedConfig.slice(0, displayCount);

  return (
    <ModalContainer minWidth="320px">
      <ModalHeader background={getThemeValue("colors.gradients.bubblegum")(theme)}>
        <ModalTitle>
          <Heading>Connect Wallet</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody width={["320px", null, "340px"]}>
        <WalletWrapper py="24px" maxHeight="394px" overflowY="auto">
          <Grid gridTemplateColumns="1fr 1fr" gridGap="8px">
            {displayListConfig.map((wallet) => (
              <Box key={wallet.title}>
                <WalletCard walletConfig={getSupportedWallet(wallet)} login={login} onDismiss={onDismiss} />
              </Box>
            ))}
            {!showMore && <MoreWalletCard onClick={() => setShowMore(true)} />}
          </Grid>
        </WalletWrapper>
        <Box p="24px">
          <Text textAlign="center" color="textSubtle" as="p" mb="16px">
            Haven&#39;t got a crypto wallet yet?
          </Text>
          <Button
            as="a"
            href="https://docs.pancakeswap.finance/get-started/connection-guide"
            variant="subtle"
            width="100%"
            target="_blank"
            rel="noreferrer noopener"
          >
            Learn How to Connect
          </Button>
        </Box>
      </ModalBody>
    </ModalContainer>
  );
};

export default ConnectModal;
