import React from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import LinkExternal from "../../components/Link/LinkExternal";
import Flex from "../../components/Box/Flex";
import { Modal } from "../Modal";
import CopyToClipboard from "./CopyToClipboard";
import { connectorLocalStorageKey } from "./config";
import { ConnectorNames } from "./types";

interface Props {
  account: string;
  logout: () => void;
  onDismiss?: () => void;
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null }) => {
  const clearCache = () => {
    window.localStorage.removeItem(connectorLocalStorageKey);
    if (window.localStorage.getItem(ConnectorNames.WalletConnect)) {
      window.localStorage.removeItem(ConnectorNames.WalletConnect);
      // Reload the webpage to disconnect walletconnect websocket.
      window.location.reload();
    }
  };

  return (
    <Modal title="Your wallet" onDismiss={onDismiss}>
      <Text
        fontSize="20px"
        bold
        style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "8px" }}
      >
        {account}
      </Text>
      <Flex mb="32px">
        <LinkExternal small href={`https://bscscan.com/address/${account}`} mr="16px">
          View on BscScan
        </LinkExternal>
        <CopyToClipboard toCopy={account}>Copy Address</CopyToClipboard>
      </Flex>
      <Flex justifyContent="center">
        <Button
          scale="sm"
          variant="secondary"
          onClick={() => {
            logout();
            clearCache();
            onDismiss();
          }}
        >
          Logout
        </Button>
      </Flex>
    </Modal>
  );
};

export default AccountModal;
