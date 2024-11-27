import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link as ChakraLink, Stack, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { FaExclamationTriangle, FaKey, FaRegAngry, FaRegLaugh, FaRegMeh, FaRegUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import TopBar from "@/components/TopBar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const links = [
    { name: 'Cadastro', href: '/cadastro' },
  ];

  async function handleLogin() {
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Campos vazios.",
        description: "Preencha os campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        icon: <FaRegAngry size="Big" />
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/users");
      const users = await response.json();

      const user = users.find(user => user.email === email && user.password === password);

      if (!user) {
        toast({
          title: "Erro ao realizar o login.",
          description: "Credenciais inválidas. Tente novamente.",
          status: "warning",
          duration: 3000,
          isClosable: true,
          icon: <FaRegMeh size="Big" />
        });
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", user.id);
      toast({
        title: "Login realizado com sucesso.",
        description: "Bem-vindo!",
        status: "success",
        duration: 3000,
        isClosable: true,
        icon: <FaRegLaugh size="Big" />
      });
      router.push("/painel_principal");

    } catch (error) {
      toast({
        title: "Erro ao conectar com o banco de dados.",
        description: `Verifique se o json-server está ligado e conectado`,
        status: "error",
        duration: 3000,
        isClosable: true,
        icon: <FaExclamationTriangle size="Big" color="yellow" />
      });

    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Flex direction="column" minH="100vh" minW="100vw" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <TopBar links={links} />
      <Stack spacing={8} mx="auto" maxW="lg" py={10} px={4}>

        <Stack align="center">
          <Heading as="h1">Entre na sua conta</Heading>
          <Text fontSize="lg" color="gray.600">acesse recursos incríveis</Text>
        </Stack>

        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>

            <FormControl id="email">
              <FormLabel display="inline-flex" align="center" gap={2} fontWeight="bold">
                <FaRegUserCircle /> Email
              </FormLabel>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="reidocapa663@outlook.com" />
            </FormControl>

            <FormControl id="password" >
              <FormLabel display="inline-flex" align="center" gap={2} fontWeight="bold" >
                <FaKey /> Senha
              </FormLabel>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" />
            </FormControl>

            <Stack spacing={5}>
              <Button isLoading={isLoading} loadingText="carregando... " bg="teal.400" color="white" _hover={{ bg: 'teal.500' }} onClick={handleLogin}>
                Entrar
              </Button>
              <ChakraLink as={Link} textAlign="center" href="/cadastro">não tem uma conta?</ChakraLink>
              <ChakraLink as={Link} textAlign="center" href="/login/recuperar-senha">Esqueci minha senha</ChakraLink>
            </Stack>

          </Stack>
        </Box>

      </Stack>
    </Flex>
  );
}
