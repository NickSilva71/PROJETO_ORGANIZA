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



export default function PainelPrincipal() {
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
      <Flex justifyContent="space-between" align="center" mb={6}>
        <Heading as="h1">Painel Principal</Heading>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
    </Flex>
    </Flex>
    <Sidebar/>
    </Flex>
  );
}
