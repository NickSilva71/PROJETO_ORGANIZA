import { Card, Flex, Heading, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { FaBuilding, FaEdit, FaMoneyBill, FaRegClock, FaTrash, FaWallet } from "react-icons/fa";

function CardRegistro({ registro, onEdit, onDelete }) {

  const { categoria, valor, descricao, data } = registro;

  const backgroundColor = useColorModeValue("white", "gray.700");

  const formatarData = (data) => {
    const dataObjeto = new Date(data);
    const dia = String(dataObjeto.getDate() + 1).padStart(2, "0");
    const mes = String(dataObjeto.getMonth() + 1).padStart(2, "0");
    const ano = dataObjeto.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Card p={4} bg={backgroundColor} borderRadius="lg" boxShadow="lg">
      <Heading size="base" mb={4}>
        <Flex align="center">
          <FaWallet color="gray.300" />
          <Text ml={2}>{categoria}</Text>
        </Flex>
      </Heading>

      <Flex direction="column" gap={2}>
        <Flex align="center">
          <FaMoneyBill color="gray.300" />
          <Text ml={2}>Valor: {parseFloat(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Text>
        </Flex>

        <Flex align="center">
          <FaBuilding color="gray.300" />
          <Text ml={2}>Descrição: {descricao}</Text>
        </Flex>

        <Flex align="center">
          <FaRegClock color="gray.300" />
          <Text ml={2}>Data: {formatarData(data)}</Text>
        </Flex>
      </Flex>

      <Flex justifyContent="flex-end" gap={2} mt={3}>
        <IconButton icon={<FaEdit />} aria-label="Editar registro" size="sm" onClick={onEdit} />
        <IconButton icon={<FaTrash />} aria-label="Excluir registro" size="sm" colorScheme="red" onClick={onDelete} />
      </Flex>
    </Card>
  );
}

export default CardRegistro;