import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";

import { useConnect } from "wagmi";

interface WalletModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const WalletModal = ({ isOpen, closeModal }: WalletModalProps) => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: "none",
          }}
        />
        <ModalBody paddingBottom="1.5rem">
          <VStack>
            {connectors.map((connector: any) => (
              <Button
                variant="outline"
                key={connector.id}
                disabled={!connector.ready}
                onClick={() => {
                  connect({ connector: connector });
                  closeModal();
                }}
                w="100%"
              >
                <HStack w="100%" justifyContent="center">
                  <Image
                    src={`/images/${connector.id}.svg`}
                    alt={connector.name}
                    height="32px"
                    width="32px"
                  />
                  <Text>
                    {connector.name} {!connector.ready && " (unsupported)"}
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      " (connecting)"}
                  </Text>
                </HStack>
              </Button>
            ))}
            {error && <Text>({error.message})</Text>}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
