import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Textarea, useColorModeValue, VStack } from "@chakra-ui/react";

function ModalRegistro({ isOpen, onClose, registro, arrayCategorias, onSave, handleChange, backgroundColor }) {
  const { id, categoria, tipo, valor, descricao, data } = registro;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg={backgroundColor}>
        <ModalHeader as="h2" alignSelf="center">
          {id ? "Editar Registro" : "Criar Registro"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} px={4} pb={4}>
            <Select required name="tipo" value={tipo} onChange={handleChange} placeholder="Selecione o tipo">
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </Select>

            {tipo &&
              (<Select required name="categoria" value={categoria} onChange={handleChange} placeholder="Selecione a categoria">
                {arrayCategorias.map((categoria, index) => (
                  <option key={index}>
                    {categoria}
                  </option>))
                }
              </Select>)
            }
            <Input required type="date" name="data" value={data} onChange={handleChange} />
            <Input requiredtype="number" name="valor" value={valor} onChange={handleChange} />
            <Textarea name="descricao" value={descricao} onChange={handleChange} placeholder="Dê detalhes" />

            <Button colorScheme="teal" onClick={onSave} w="full">
              Criar {tipo && tipo}
            </Button>

          </VStack>
        </ModalBody>

      </ModalContent>

    </Modal >
  )
};

export default ModalRegistro;