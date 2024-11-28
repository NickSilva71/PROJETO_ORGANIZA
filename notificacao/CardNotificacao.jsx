import { Card, Heading, Text, Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaBell, FaBookOpen, FaMoneyBill, FaRegClock, FaTrash } from "react-icons/fa";

export default function CardNotificacao({ notificacao, onDelete }) {
  const backgroundColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Card
      bg={backgroundColor}
      p={4}
      borderColor={borderColor}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading size="base" mb={4} color={textColor}>
        <Flex align="center">
          <FaBell color="gray.300" />
          <Text ml={2}>{notificacao.name}</Text>
        </Flex>
      </Heading>

      <Flex direction="column" gap={2}>
        <Flex align="center">
          <FaBookOpen color="gray.300" />
          <Text ml={2} color={textColor}>{notificacao.description}</Text>
        </Flex>
        
        <Flex align="center">
          <FaMoneyBill color="gray.300" />
          <Text ml={2} color={textColor}>Valor: R${notificacao.value}</Text>
        </Flex>
        
        <Flex align="center">
          <FaRegClock color="gray.300" />
          <Text ml={2} color={textColor}>Data Limite: {notificacao.date}</Text>
        </Flex>
      </Flex>
      
      <Flex justify="space-between" mt={4}>
        <IconButton
          onClick={() => onDelete(notificacao.id)}
          aria-label="Excluir Notificação"
          icon={<FaTrash />}
          size="sm"
          colorScheme="red"
        />
      </Flex>
    </Card>
  );
}
