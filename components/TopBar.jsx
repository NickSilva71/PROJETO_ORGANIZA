import { Box, Button, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function TopBar({ links }) {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex position="absolute" top={0} w="100vw" shadow="md" bg={useColorModeValue('white', 'gray.700')} h={16} align="center" justifyContent="space-between">

        <Link href="/">
          <Box fontSize="xl" fontWeight="bold" p={2} ml={4}>
            ORGANIZA
          </Box>
        </Link>

        <Flex mr={4} align="center">
          {links.map(link =>
            <Button
              as={Link}
              key={link.name}
              p={{base: 2, md: 4}}
              m={2}
              rounded="md"
              bg="WhiteAlfa"
              _hover={{ bg: "teal.400" }}
              href={link.href}>
              {link.name}
            </Button>
          )}
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </Flex>

    </Flex>
  );
}
