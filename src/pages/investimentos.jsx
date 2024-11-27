import { FaPlus, FaMoon, FaSun, FaMoneyBill, FaBuilding, FaPercentage, FaRegClock, FaWallet, FaExclamationTriangle, FaRegMeh } from "react-icons/fa";
import { Flex, SimpleGrid, Card, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Heading, useDisclosure, useColorMode, Button, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import CriarInvestimento from "@/components/investimentos/CriarInvestimento";
import VerificarAutenticacao from "@/components/VerificarAutenticacao";

function Investimentos() {
  const [investimentos, setInvestimentos] = useState([]);

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const userId = localStorage.getItem("token");

  async function fetchInvestimentos() {
    try {
      const response = await fetch(`http://localhost:8000/investments?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar investimentos");
      }

      const data = await response.json();
      setInvestimentos(data);

    } catch (error) {
      toast({
        title: `${error}` || "Erro ao conectar com o servidor.",
        description: `Verifique se você está conectado`,
        status: "error",
        duration: 3000,
        isClosable: true,
        icon: <FaExclamationTriangle size="Big" color="yellow" />
      });
    }
  }

  async function handleInvestimento(dadosInvestimento) {
    try {
      const novoInvestimento = { ...dadosInvestimento, userId };

      const response = await fetch("http://localhost:8000/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoInvestimento),
      });

      if (!response.ok) {
        throw new Error("Erro ao Criar Investimento");
      }

      const data = await response.json();
      setInvestimentos((prevInvestimentos) => [...prevInvestimentos, data]);

      toast({
        title: "Investimento criado com sucesso!",
        description: "Ele deve aparecer na sua tela.",
        status: "success",
        duration: 3000,
        isClosable: true
      })

      // isso tá mostrando erro mas, é por causa de outras coisas.
      // tá funcionando.
    } catch (error) {
      toast({
        title: "Erro ao conectar com servidor.",
        description: `${error}` || "Verifique se você está conectado",
        status: "error",
        duration: 3000,
        isClosable: true,
        icon: <FaExclamationTriangle size="Big" color="yellow" />
      });

    } finally {
      onClose();
    }
  };

  useEffect(() => { fetchInvestimentos() }, []);

  const calcularRetorno = (valor, juros, anos) => {
    return valor * Math.pow(1 + juros / 100, anos);
  };

  const backgroundColor = useColorModeValue('white', 'gray.700');
  return (
    <Flex>
      <Flex direction="column" p={6} ml={{ base: 0, md: "200px" }} mb={{ base: "80px", md: 0 }} gap={6} w="100%">

        {/* Titulo e Modo Escuro */}
        <Flex justifyContent="space-between" align="center" mb={6}>
          <Heading as="h1">Investimentos</Heading>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </Flex>

        {/* Conteudo Principal */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {/* Botão de adicionar */}
          <IconButton
            onClick={onOpen}
            aria-label="Adicionar novo investimento"
            icon={<FaPlus />}
            size="lg"
            h="100%"
            cursor="pointer"
            p={6}
          />

          {/* Cards de investimentos */}
          {investimentos.map((investimento) => (
            <Card bg={backgroundColor} key={investimento.id} p={4} borderColor="gray.300" borderRadius="lg" boxShadow="lg">
              <Heading size="base" mb={4}>
                <Flex align="center">
                  <FaWallet color="gray.300" />
                  <Text ml={2}>{investimento.tipo}</Text>
                </Flex>
              </Heading>

              <Flex direction="column" gap={2}>
                <Flex align="center">
                  <FaMoneyBill color="gray.300" />
                  <Text ml={2}>
                    Valor: {investimento.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </Text>
                </Flex>

                <Flex align="center">
                  <FaBuilding color="gray.300" />
                  <Text ml={2}>Instituição: {investimento.instituicao}</Text>
                </Flex>
                <Flex align="center">
                  <FaPercentage color="gray.300" />
                  <Text ml={2}>Juros: {investimento.juros}%</Text>
                </Flex>
                <Flex align="center">
                  <FaRegClock color="gray.300" />
                  <Text ml={2}>Tempo: {investimento.tempo} anos</Text>
                </Flex>
                <Flex align="center">
                  <FaMoneyBill color="gray.300" />
                  <Text ml={2}>
                    <strong>
                      {calcularRetorno(investimento.valor, investimento.juros, investimento.tempo)
                        .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </strong>
                  </Text>
                </Flex>
              </Flex>
            </Card>
          ))}
        </SimpleGrid>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="h2" alignSelf="center">
            Criar Investimento
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CriarInvestimento onSubmit={handleInvestimento} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Sidebar />
    </Flex>
  );
}

export default VerificarAutenticacao(Investimentos);