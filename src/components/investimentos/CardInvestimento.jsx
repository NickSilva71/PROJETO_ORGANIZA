import { Card, Flex, Heading, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { FaBuilding, FaEdit, FaMoneyBill, FaPercentage, FaRegClock, FaTrash, FaWallet } from "react-icons/fa";

function CardInvestimento({ investimento, backgroundColor }) {

  const { tipo, valor, instituicao, juros, tempo } = investimento;

  const calcularRetorno = valor * Math.pow(1 + juros / 100, tempo);

  return (
    <Card p={4} bg={backgroundColor} borderRadius="lg" boxShadow="lg">
      <Heading size="base" mb={4}>
        <Flex align="center">
          <FaWallet color="gray.300" />
          <Text ml={2}>{tipo}</Text>
        </Flex>
      </Heading>

      <Flex direction="column" gap={2}>
        <Flex align="center">
          <FaMoneyBill color="gray.300" />
          <Text ml={2}>Valor: {parseFloat(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Text>
        </Flex>

        <Flex align="center">
          <FaBuilding color="gray.300" />
          <Text ml={2}>Instituição: {instituicao}</Text>
        </Flex>

        <Flex align="center">
          <FaPercentage color="gray.300" />
          <Text ml={2}>Juros: {investimento.juros}%</Text>
        </Flex>

        <Flex align="center">
          <FaRegClock color="gray.300" />
          <Text ml={2}>Anos: {tempo} anos</Text>
        </Flex>
      </Flex>

      <Flex align="center">
        <FaMoneyBill color="gray.300" />
        <Text ml={2} fontWeight="bold">
          {calcularRetorno.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </Text>
      </Flex>
    </Card>
  );
}

export default CardInvestimento;