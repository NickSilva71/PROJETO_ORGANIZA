import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, VStack } from "@chakra-ui/react";

function ConfirmarDeletar({ isOpen, onClose, onConfirm, tipo }) {
  const backgroundColor = useColorModeValue('white', 'gray.700');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg={backgroundColor}>
        <ModalHeader alignSelf="center">Excluir {tipo}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack>
            <Text>Você deseja excluir esse {tipo}? não há como recuperar</Text>
            <Button colorScheme="red" onClick={onConfirm} w="full">
              Excluir
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
};

export default ConfirmarDeletar;