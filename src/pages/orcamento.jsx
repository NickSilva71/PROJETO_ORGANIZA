import React, { useCallback, useEffect, useState } from "react";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Input, Button, Flex, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import Sidebar from "@/components/layout/Sidebar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { FaMoon, FaSun } from "react-icons/fa";
import VerificarAutenticacao from "@/components/VerificarAutenticacao";
import { createBudget, fetchBudgetData } from "@/api/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Orcamento() {
  const { colorMode, toggleColorMode } = useColorMode();
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const inputBg = useColorModeValue("white", "gray.800");
  const shadowColor = useColorModeValue("md", "lg-dark");

  const [budgetData, setBudgetData] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newActual, setNewActual] = useState("");
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

  const loadBudgetData = async () => {
    try {
      const { data } = await fetchBudgetData(userId);
      setBudgetData(data);
    } catch (error) {
      showToast("Erro ao buscar orçamento", error.message || "Não foi possível conectar ao servidor", "error");
    }
  };

  const addCategory = async () => {
    if (newCategory && newBudget && newActual) {
      const newEntry = {
        category: newCategory,
        budget: parseFloat(newBudget),
        actual: parseFloat(newActual),
        userId
      };

      try {
        const { data } = await createBudget(newEntry);
        setBudgetData((prev) => [...prev, data]);
        toast({
          title: "Categoria adicionada com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setNewCategory("");
        setNewBudget("");
        setNewActual("");
      } catch (error) {
        toast({
          title: "Erro ao adicionar categoria.",
          description: "Verifique se o servidor está ativo.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    loadBudgetData();
  }, []);

  const checkBudgetAlert = (budget, actual) => {
    const percentage = (actual / budget) * 100;
    if (actual > budget) {
      return "⚠️ Excedeu";
    } else if (percentage > 80) {
      return "⚠️ Gastos próximos do limite (80%)!";
    } else {
      return "";
    }
  };

  const chartData = {
    labels: budgetData.map((item) => item.category),
    datasets: [
      {
        label: "Orçamento",
        data: budgetData.map((item) => item.budget),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Gasto Real",
        data: budgetData.map((item) => item.actual),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `R$ ${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
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
        <Flex justifyContent="space-between" align="center" mb={6}>
          <Heading as="h1">Orçamento</Heading>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </Flex>
        <Box
          bg={cardBg}
          borderRadius="lg"
          shadow={shadowColor}
          p="6"
          mb="6"
        >
          <Heading as="h2" size="md" mb="4">
            Adicionar Categoria de Orçamento
          </Heading>
          <Flex mb="4" gap="4" direction={{ base: "column", md: "row" }}>
            <Input
              required
              placeholder="Categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              bg={inputBg}
            />
            <Input
              required
              placeholder="Orçamento (R$)"
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              bg={inputBg}
            />
            <Input
              required
              placeholder="Gasto Real (R$)"
              type="number"
              value={newActual}
              onChange={(e) => setNewActual(e.target.value)}
              bg={inputBg}
            />
            <Button
              colorScheme="teal"
              onClick={addCategory}
              size="md"
              px={8}
              isTruncated
              textAlign="center"
            >
              Adicionar
            </Button>
          </Flex>
        </Box>

        <Box
          bg={cardBg}
          borderRadius="lg"
          shadow={shadowColor}
          p="6"
          mb="6"
          overflowX="auto"
        >
          <Heading as="h2" size="md" mb="4">
            Detalhes do Orçamento
          </Heading>
          <Table variant="simple" size="sm" maxW="100%">
            <Thead >
              <Tr>
                <Th>Categoria</Th>
                <Th>Orçamento (R$)</Th>
                <Th>Gasto Real (R$)</Th>
                <Th>Alerta</Th>
              </Tr>
            </Thead>
            <Tbody>
              {budgetData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.category}</Td>
                  <Td>{item.budget.toFixed(2)}</Td>
                  <Td>{item.actual.toFixed(2)}</Td>
                  <Td color={item.actual > item.budget ? "red.500" : "orange.500"}>
                    {checkBudgetAlert(item.budget, item.actual)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box
          bg={cardBg}
          borderRadius="lg"
          shadow={shadowColor}
          p="6"
          overflowX="auto"
        >
          <Heading as="h2" size="md" mb="4">
            Gráfico de Orçamento
          </Heading>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </Flex>
      <Sidebar />
    </Flex>
  );
}

export default VerificarAutenticacao(Orcamento);