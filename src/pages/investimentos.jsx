import { FaPlus, FaMoon, FaSun, FaExclamationTriangle } from "react-icons/fa";
import { Flex, SimpleGrid, IconButton, Heading, useDisclosure, useColorMode, Button, useColorModeValue, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import ModalInvestimento from "@/components/investimentos/ModalInvestimento";
import VerificarAutenticacao from "@/components/VerificarAutenticacao";
import CardInvestimento from "@/components/investimentos/CardInvestimento";

function Investimentos() {
  const [investimentos, setInvestimentos] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const userId = localStorage.getItem("token");

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      icon: <FaExclamationTriangle size="lg" color="yellow" />,
    });
  };

  const fetchInvestimentos = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/investments?userId=${userId}`);
      if (!response.ok) throw new Error("Erro ao buscar investimentos");

      const data = await response.json();
      setInvestimentos(data);
    } catch (error) {
      showToast("Erro ao conectar com o servidor", "Verifique se você está conectado", "error");
    }
  }, [userId, showToast]);

  const handleInvestimento = async (dadosInvestimento) => {
    try {
      const novoInvestimento = { ...dadosInvestimento, userId };
      const response = await fetch("http://localhost:8000/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoInvestimento),
      });

      if (!response.ok) throw new Error("Erro ao Criar Investimento");

      const data = await response.json();
      setInvestimentos((prevInvestimentos) => [...prevInvestimentos, data]);

      toast({
        title: "Investimento criado com sucesso!",
        description: "Ele deve aparecer na sua tela.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      showToast("Erro ao conectar com o servidor", error.message || "Verifique se você está conectado", "error");
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    fetchInvestimentos();
  }, [fetchInvestimentos]);

  const backgroundColor = useColorModeValue('white', 'gray.700');
  return (
    <Flex>
      <Sidebar />

      <Flex direction="column" p={6} ml={{ base: 0, md: "200px" }}w="100%">
        <Flex justifyContent="space-between" mb={6}>
          <Heading>Receitas e Despesas</Heading>
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <FaMoon /> : <FaSun />}</Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <IconButton
            onClick={onOpen}
            aria-label="Adicionar novo investimento"
            icon={<FaPlus />}
            size="lg"
            h="100%"
            cursor="pointer"
            p={6}
          />

          {investimentos.map((investimento) => (
            <CardInvestimento
              key={investimento.id}
              investimento={investimento}
              backgroundColor={backgroundColor}
            />
          ))}
        </SimpleGrid>
      </Flex>

      <ModalInvestimento
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleInvestimento}
        backgroundColor={backgroundColor}
      />
    </Flex>
  );
}

export default VerificarAutenticacao(Investimentos);