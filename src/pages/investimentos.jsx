import Sidebar from "@/components/Sidebar";
import CriarInvestimento from "@/components/CriarInvestimento";
import { useState } from "react";
import {
  FaPlus,
  FaMoon,
  FaSun,
  FaMoneyBill,
  FaBuilding,
  FaPercentage,
  FaRegClock,
  FaWallet
} from "react-icons/fa";
import {
  Flex,
  SimpleGrid,
  Card,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
  useDisclosure,
  useColorMode,
  Button,
  Text
} from "@chakra-ui/react";

export default function Investimentos() {
  // Investimento e Calculo
  const [investimentos, setInvestimentos] = useState([
    {
      tipo: "Poupança",
      valor: 1000,
      instituicao: "Banco do Brasil",
      juros: 1.5,
      tempo: 2,
    },
    {
      tipo: "Fundos Imobiliários",
      valor: 50000,
      instituicao: "ImobiCorp",
      juros: 3,
      tempo: 3,
    },
    {
      tipo: "Tesouro Direto",
      valor: 5000,
      instituicao: "CDB Itau",
      juros: 2.5,
      tempo: 2,
    },
  ]);
  
  const calcularRetorno = (valor, juros, anos) => {
    return valor * Math.pow(1 + juros / 100, anos);
  };

  // Modo Escuro
  const { colorMode, toggleColorMode } = useColorMode();

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleInvestimento = (dadosInvestimento) => {
    setInvestimentos([...investimentos, dadosInvestimento]);
    onClose();
  };

  return (
    <Flex>
      <Flex
        direction="column"
        p={6}
        ml={{ base: 0, md: "200px" }}
        mb={{ base: "80px", md: 0 }}
        gap={6}
        w="100%"
      >
        {/* Titulo e Modo Escuro */}
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
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
          {investimentos.map((investimento, index) => (
            <Card
              key={index}
              p={4}
              borderWidth={2}
              borderColor="gray.300"
              borderRadius="lg"
              boxShadow="lg"
              variant="outline"
            >
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
                    Valor: {investimento.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
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
                      {calcularRetorno(
                        investimento.valor,
                        investimento.juros,
                        investimento.tempo,
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
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
