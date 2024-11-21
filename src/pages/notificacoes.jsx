import {
  Box,
  Heading,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  VStack,
  Text
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import BoletoNotification from "@/components/Boleto";
import InvestimentoNotificacion from "@/components/Investimento";

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:8000/dadosUsuarios");
  const data = await response.json();

  return {
    props: {
      products: data,
    },
    revalidate: 86400,
  };
};

const Notificacoes = (props) => {
  const bgColor = useColorModeValue("teal.50", "gray.700");
  const borderColor = useColorModeValue("teal.600", "teal.300");
  const shadowColor = useColorModeValue("lg", "dark-lg");
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading as="h1">Notificações</Heading>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </Flex>

        {/* Notificações */}
        <Box
          bg={bgColor}
          border="2px solid"
          borderColor={borderColor}
          borderRadius="xl"
          shadow={shadowColor}
          p={6}
          w="100%"
          maxW="600px"
        >
          <Heading as="h2" size="md" mb={4}>
            Notificações a cada 24 horas
          </Heading>
          <VStack align="start" spacing={2}>
            {props.products.map((product) => (
              <Text key={product.id} fontSize="lg">
                - {product.name}
              </Text>
            ))}
          </VStack>
        </Box>

        {/* Notificação de Boleto */}
        <Box
          bg={bgColor}
          border="2px solid"
          borderColor={borderColor}
          borderRadius="xl"
          shadow={shadowColor}
          p={6}
          w="100%"
          maxW="600px"
        >
          <BoletoNotification />
        </Box>

        {/* Notificação de Investimento */}
        <Box
          bg={bgColor}
          border="2px solid"
          borderColor={borderColor}
          borderRadius="xl"
          shadow={shadowColor}
          p={6}
          w="100%"
          maxW="600px"
        >
          <InvestimentoNotificacion />
        </Box>
    </Flex>
    <Sidebar />
    </Flex>
    
  );
};

export default Notificacoes;
