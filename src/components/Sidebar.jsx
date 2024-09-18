import { FaChartLine, FaWallet, FaClipboardList, FaDollarSign, FaBell } from "react-icons/fa";
import { Flex, Link, Icon, Text } from "@chakra-ui/react";

export default function Sidebar() {
  const menuItems = [
    { href: "/painel_principal",  icon: FaChartLine,      label: "Painel Principal"     },
    { href: "/receitas",          icon: FaWallet,         label: "Receitas e Despesas"  },
    { href: "/orcamento",         icon: FaClipboardList,  label: "Orçamento"            },
    { href: "/investimentos",     icon: FaDollarSign,     label: "Investimentos"        },
    { href: "/notificacoes",      icon: FaBell,           label: "Notificações"         },
  ];

  return (
    <Flex
      as="nav"
      pos="fixed"
      direction={{ base: "row", md: "column" }}
      bg="teal.600"
      color="white"
      bottom={0}
      w={{ base: "full", md: 48 }}
      h={{ base: "auto", md: "full" }}
      p={4}
      justify={{ base: "space-between", md: "flex-start" }}
      shadow="dark-lg"
    >
      {menuItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          _hover={{bg: "teal.700" }}
          p={3}
          borderRadius="md"
          display="flex"
          alignItems="center"
        >
          <Icon as={item.icon} boxSize={6} />
          <Text display={{ base: "none", md: "inline" }} ml={3} fontSize="sm">
            {item.label}
          </Text>
        </Link>
      ))}
    </Flex>
  );
}
