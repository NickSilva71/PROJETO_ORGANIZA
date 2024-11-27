import TopBar from '@/components/TopBar';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useColorModeValue, useToast, FormErrorMessage, useColorMode, Checkbox, Card } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaAt, FaExclamationTriangle, FaMoon, FaRegLaugh, FaRegUser, FaRegUserCircle, FaSun, FaUserAltSlash } from 'react-icons/fa';

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UserConfirmation, setUserConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const links = [
    { name: 'Login', href: '/login' },
    { name: 'Cadastro', href: '/cadastro' },
  ];

  const handleSubmit = async () => {
    setIsLoading(true)

    if (!email) {
      toast({
        title: "O campo está vazio.",
        description: "Por favor, insira um email.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        icon: <FaAt size="Big" />
      });
      setIsLoading(false);
      return;
    }
    if (!UserConfirmation) {
      toast({
        title: "Confirme que é você.",
        description: "Apenas se você prometer.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        icon: <FaAt size="Big" />
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users');
      const users = await response.json();

      const user = users.find(user => user.email === email);

      if (!user) {
        toast({
          title: "Email inválido.",
          description: "O usuário não foi encontrado.",
          status: "warning",
          duration: 3000,
          isClosable: true,
          icon: <FaUserAltSlash size="Big" />
        });
        setIsLoading(false);
        return;
      }

      setPassword(user.password);


      // Isso é completamente inseguro, mas fazer o que.
      toast({
        title: "Eu acredito que isso é seu!",
        description: "Agora você pode agora fazer login.",
        status: "success",
        duration: 3000,
        isClosable: true,
        icon: <FaRegLaugh size="Big" />
      })

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
      setIsLoading(false)
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue("gray.50", "gray.800")}>
      <TopBar links={links}/>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>

        <Stack align="center">
          <Heading as="h1">Recupere sua senha</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>esquecer é humano</Text>
        </Stack>

        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel display="flex" align="center" gap={2}>
                  <FaRegUserCircle /> Qual o seu email?
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <Stack spacing={5} pt={2}>
              <Checkbox
                name='UserConfirmation'
                value={UserConfirmation}
                align="center"
                size="lg"
                isRequired
                onChange={(e) => setUserConfirmation(e.target.checked)}>
                Eu juro que é o meu email
              </Checkbox>
              <Button
                isLoading={isLoading}
                loadingText="Enviando"
                size="lg"
                color="white"
                bg={useColorModeValue("teal.400", "teal.600")}
                _hover={{ bg: "teal.500" }}
                onClick={handleSubmit}>
                Enviar
              </Button>
              {password &&
                <Card>
                  <Text fontSize="xl" textAlign="center" padding={2}>
                    {password}
                  </Text>
                </Card>
              }
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
