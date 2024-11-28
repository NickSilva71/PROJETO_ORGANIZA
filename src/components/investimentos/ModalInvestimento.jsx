import { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, NumberInput, NumberInputField, VStack, Button, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, InputLeftElement, InputGroup, Text, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalHeader } from "@chakra-ui/react";
import { FaMoneyBill, FaBuilding, FaPercentage, FaRegClock, FaWallet } from "react-icons/fa";

export default function ModalInvestimento({ isOpen, onClose, onSubmit, backgroundColor }) {

  const [tipo, setTipo] = useState();
  const [valor, setValor] = useState();
  const [instituicao, setInstituicao] = useState();
  const [juros, setJuros] = useState();
  const [tempo, setTempo] = useState();
  const [retornoEstimado, setRetornoEstimado] = useState(null);

  const calcularRetornoEstimado = (valor, juros, tempo) => {
    if (valor && juros && tempo) {
      return valor * Math.pow(1 + juros / 100, tempo);
    }
    return null;
  };

  useEffect(() => {
    const retorno = calcularRetornoEstimado(valor, juros, tempo);
    setRetornoEstimado(retorno);
  }, [valor, juros, tempo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ tipo, valor, instituicao, juros, tempo });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg={backgroundColor}>
        <ModalHeader as="h2" alignSelf="center">
          Criar Investimento
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} px={4} pb={4}>
              <FormControl id="tipo" isRequired>
                <FormLabel>Tipo</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaWallet color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Poupança"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="valor" isRequired>
                <FormLabel>Valor</FormLabel>
                <NumberInput
                  min={0.01}
                  precision={2}
                  onChange={(v) => setValor(parseFloat(v.replace(/^R\$/, "")))}
                  allowMouseWheel
                >
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaMoneyBill color="gray.300" />
                    </InputLeftElement>
                    <NumberInputField pl={10} placeholder="R$ 2000.00" />
                  </InputGroup>
                </NumberInput>
              </FormControl>

              <FormControl id="instituicao" isRequired>
                <FormLabel>Instituição</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaBuilding color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Caixa Econômica Federal"
                    value={instituicao}
                    onChange={(e) => setInstituicao(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="juros" isRequired>
                <FormLabel>Juros ao ano</FormLabel>
                <NumberInput
                  min={0.01}
                  precision={2}
                  step={0.1}
                  onChange={(valueString) => setJuros(parseFloat(valueString))}
                >
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaPercentage color="gray.300" />
                    </InputLeftElement>
                    <NumberInputField pl={10} placeholder="10.40%" />
                  </InputGroup>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl id="tempo" isRequired>
                <FormLabel>Tempo</FormLabel>
                <NumberInput
                  min={1}
                  onChange={(valueString) => setTempo(parseInt(valueString))}
                >
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaRegClock color="gray.300" />
                    </InputLeftElement>
                    <NumberInputField pl={10} placeholder="3 anos" />
                  </InputGroup>
                </NumberInput>
              </FormControl>

              {retornoEstimado && (
                <Text fontWeight="bold" color="teal.500">
                  Retorno Estimado:{" "}
                  {retornoEstimado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              )}

              <Button colorScheme="teal" type="submit">
                Criar Investimento
              </Button>
            </VStack>
          </form>
        </ModalBody>

      </ModalContent>

    </Modal>

  );
}
