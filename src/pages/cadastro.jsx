import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, Link as ChakraLink, useColorModeValue, useToast } from "@chakra-ui/react";
import { FaAt, FaExclamationTriangle, FaHandshakeSlash, FaKey, FaRegAngry, FaRegLaugh, FaRegUserCircle, FaUserAltSlash } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import TopBar from "@/components/TopBar";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast();
  const router = useRouter();

  const links = [
    { name: 'Login', href: '/login' },
  ];

  async function handleCadastro() {
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Campos vazios.",
        description: "Preencha todos os campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        icon: <FaRegAngry size="Big" />
      });
      setIsLoading(false);
      return;
    }
    if (!/^[a-zA-Zà-úÀ-Ú\s]{2,50}$/.test(name)) {
      toast({
        title: "Nome inválido.",
        description: "Apenas letras de 2 até 50 caracteres",
        status: "warning",
        duration: 3000,
        isClosable: true,
        icon: <FaAt size="Big" />
      });
      setIsLoading(false);
      return;
    }

    if (!/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      toast({
        title: "Email inválido.",
        description: "Domínio não está presente.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        icon: <FaAt size="Big" />
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Senha inválida.",
        description: "Use pelo menos 8 caracteres",
        status: "warning",
        duration: 3000,
        isClosable: true,
        icon: <FaAt size="Big" />
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erro ao validar",
        description: "As senhas não batem",
        status: "warning",
        duration: 3000,
        isClosable: true,
        icon: <FaHandshakeSlash size="Big" />
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/users");
      const users = await response.json();

      const userExist = users.some(user => user.email === email);

      if (userExist) {
        toast({
          title: "Erro ao cadastrar.",
          description: "já tem alguém usando esse email.",
          status: "warning",
          duration: 3000,
          isClosable: true,
          icon: <FaUserAltSlash size="Big" />
        });
        setIsLoading(false);
        return;
      }

      await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      toast({
        title: "Cadastro realizado!",
        description: "Agora você pode agora fazer login.",
        status: "success",
        duration: 3000,
        isClosable: true,
        icon: <FaRegLaugh size="Big" />
      })
      router.push("/login");

    } catch (error) {
      toast({
        title: "Erro ao conectar com o banco de dados.",
        description: `Verifique se o json-server está ligado e conectado ${error}`,
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
    <Flex minH="100vh" minW="100vw" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <TopBar links={links} />
      <Stack spacing={8} mx="auto" maxW="lg" py={10} px={4}>

        <Stack align="center">
          <Heading as="h1">Crie sua conta</Heading>
          <Text fontSize="lg" color="gray.600">comece sua jornada</Text>
        </Stack>

        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>

            <FormControl id="name">
              <FormLabel display="inline-flex" align="center" gap={2}>
                <FaRegUserCircle /> Qual o seu nome?
              </FormLabel>

              <Input type="name" value={name} onChange={e => setName(e.target.value)} placeholder="José Cicrano da Silva" />
            </FormControl>

            <FormControl id="email">
              <FormLabel display="inline-flex" align="center" gap={2}>
                <FaAt /> Seu Email
              </FormLabel>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="exemplo@enterprise.com" />
            </FormControl>

            <FormControl id="password">
              <FormLabel display="inline-flex" align="center" gap={2}>
                <FaKey /> Senha
              </FormLabel>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" />
            </FormControl>

            <FormControl id="confirm-password">
              <FormLabel display="inline-flex" align="center" gap={2}>
                <FaKey /><FaKey /> Confirme sua Senha
              </FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="********" />
            </FormControl>

            <Stack spacing={5}>
              <Button
                isLoading={isLoading}
                loadingText="Carregando"
                size="lg"
                color="white"
                bg={useColorModeValue("teal.400", "teal.600")}
                _hover={{ bg: 'teal.500' }}
                onClick={handleCadastro}>
                Cadastrar
              </Button>
              <ChakraLink as={Link} textAlign="center" href="/login">Já tem uma conta?</ChakraLink>
            </Stack>

          </Stack>
        </Box>

      </Stack>
    </Flex>
  );
}

