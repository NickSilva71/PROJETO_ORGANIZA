import { useEffect, useState } from 'react';
import { fetchRegistros, fetchBudgetData } from '@/api/api';
import { Box, Text, Flex, Heading, Button, useColorMode, Card, CardBody } from '@chakra-ui/react';
import VerificarAutenticacao from '@/components/VerificarAutenticacao';
import Sidebar from '@/components/layout/Sidebar';
import { FaMoon, FaSun } from 'react-icons/fa';

const Dashboard = () => {
  const [registros, setRegistros] = useState([]);
  const [orcamento, setOrcamento] = useState([]);
  const [investimento, setInvestimento] = useState([]);
  const [notificacao, setNotificacao] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const userId = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        const registrosData = await fetchRegistros(userId);
        const orcamentoData = await fetchBudgetData(userId);
        const investimentoData = await fetch(`http://localhost:8000/investments?userId=${userId}`);
        const notificacaoData = await fetch(`http://localhost:8000/notifications?userId=${userId}`);

        // Convertendo a resposta para JSON
        const investimentoJson = await investimentoData.json();
        const notificacaoJson = await notificacaoData.json();


        setRegistros(registrosData.data);
        setOrcamento(orcamentoData.data);
        setInvestimento(investimentoJson);
        setNotificacao(notificacaoJson);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [userId]);

  return (
    <Flex>
      <Sidebar />
      <Flex direction="column" p={6} w="100%" ml={{ base: 0, md: "200px" }}>
        <Flex justifyContent="space-between" mb={6}>
          <Heading>Painel Principal</Heading>
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <FaMoon /> : <FaSun />}</Button>
        </Flex>

        {/* Meus Registros - Horizontal scroll */}
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="bold">Meus Registros</Text>
          <Flex overflowX="auto" p={2}>
            {registros.map((registro) => (
              <Card key={registro.id} width="250px" boxShadow="md" m={2}>
                <CardBody>
                  <Text fontWeight="bold">{registro.nome}</Text>
                  <Text>{registro.descricao}</Text>
                  <Text>Data: {registro.data}</Text>
                  <Text>Valor: R${registro.valor}</Text>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Box>

        {/* Orçamento - Horizontal scroll */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Orçamento</Text>
          <Flex overflowX="auto" p={2}>
            {orcamento.map((item) => (
              <Card key={item.id} width="250px" boxShadow="md" m={2}>
                <CardBody>
                  <Text fontWeight="bold">Categoria: {item.category}</Text>
                  <Text>Orçamento: R${item.budget}</Text>
                  <Text>Atual: R${item.actual}</Text>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Box>

        {/* Investimentos - Horizontal scroll */}
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="bold">Investimentos</Text>
          <Flex overflowX="auto" p={2}>
            {investimento.map((item) => (
              <Card key={item.id} width="250px" boxShadow="md" m={2}>
                <CardBody>
                  <Text fontWeight="bold">tipo: {item.tipo}</Text>
                  <Text>Valor: R${item.valor}</Text>
                  <Text>Instituição: {item.instituicao}</Text>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Box>

        <Box>
          <Text fontSize="2xl" fontWeight="bold">Notificacao</Text>
          <Flex overflowX="auto" p={2}>
            {notificacao.map((item) => (
              <Card key={item.id} width="250px" boxShadow="md" m={2}>
                <CardBody>
                  <Text fontWeight="bold">Name: {item.name}</Text>
                  <Text>value: R${item.value}</Text>
                  <Text>description: {item.description}</Text>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default VerificarAutenticacao(Dashboard);
