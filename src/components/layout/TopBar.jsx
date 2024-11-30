import { Box, Button, Flex} from '@chakra-ui/react';
import { ColorModeButton, useColorModeValue } from '../ui/color-mode';
import { color } from "@/styles/theme.js"
import Link from 'next/link';

export default function TopBar({ links }) {

  return (
    <Flex position="absolute" top={0} w="100vw" shadow="md" bg={color.subBackground} h={16} align="center" justifyContent="space-between">

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
              bg="transparent"
              _hover={{ bg: "teal.400" }}
              href={link.href}>
              {link.name}
            </Button>
          )}
          <ColorModeButton />
        </Flex>

    </Flex>
  );
}
