import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import CriarNotificacao from "./CriarNotificacao"; 
import React from "react";

export default function ModalCriarNotificacao({ isOpen, onClose, onSubmit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as="h2">Criar Notificação</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CriarNotificacao onSubmit={onSubmit} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


