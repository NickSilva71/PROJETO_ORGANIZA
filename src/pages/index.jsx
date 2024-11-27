import { Box, Button, Container, Flex, Heading, Image as ChakraImage, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from "react";
import TopBar from '@/components/TopBar';
import Link from 'next/link';

export default function Home() {

  const links = [
    { name: 'Login', href: '/login' },
    { name: 'Cadastro', href: '/cadastro' },
  ];

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" pt={10}>
      <TopBar links={links} />

      <Container maxW="6xl" py={16}>
        <Flex align="center" justify="space-between" direction={{ base: 'column', md: 'row' }}>

          <Stack spacing={6} flex="1" maxW="lg">
            <Heading as="h1" size="2xl" color={useColorModeValue('teal.600', 'teal.400')}>
              Bem-vindo ao ORGANIZA!
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
              A ferramenta perfeita para gerenciar seus investimentos, orçamento e finanças.
              Organize suas finanças de maneira eficiente e tenha controle total.
            </Text>

            <Stack spacing={4} direction="row" >
              <Button colorScheme="teal" color="white" bg="teal" size="lg" href="/cadastro" as={Link}>
                Comece já
              </Button>
              <Button colorScheme="gray" size="lg" href="/login" as={Link}>
                Tenho Conta
              </Button>
            </Stack>

          </Stack>
          <Box flex="1" mt={{ base: 8, md: 0 }} textAlign="center">
            <ChakraImage
              src={useColorModeValue("/investimentos.png", "/investimentos-dark.png")}
              alt="Imagem de Investimentos"
              rounded="md"
              shadow="md"
              objectFit="cover"
            />
          </Box>
        </Flex>
      </Container>

      <Box bg={useColorModeValue('white', 'gray.800')} py={16}>
        <Container maxW="6xl">
          <Heading as="h2" size="xl" textAlign="center" mb={8}>
            Principais Recursos
          </Heading>
          <Flex wrap="wrap" justify="space-around" gridGap={8}>
            <FeatureCard
              title="Gestão de Investimentos"
              description="Acompanhe o desempenho dos seus investimentos com facilidade."
              icon="📈"
            />
            <FeatureCard
              title="Controle de Orçamento"
              description="Planeje seu orçamento mensal e veja onde você pode economizar."
              icon="💰"
            />
            <FeatureCard
              title="Relatórios Detalhados"
              description="Obtenha insights sobre sua saúde financeira com gráficos."
              icon="📊"
            />
          </Flex>
        </Container>
      </Box>

    </Box>
  );
}

const FeatureCard = ({ title, description, icon }) => (
  <Box p={6} bg={useColorModeValue('gray.100', 'gray.700')} rounded="lg" shadow="md" textAlign="center" w={{ base: '100%', md: '30%' }}>
    <Text fontSize="4xl" mb={4}>
      {icon}
    </Text>
    <Heading as="h3" size="md" mb={2}>
      {title}
    </Heading>
    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
      {description}
    </Text>
  </Box>
);

