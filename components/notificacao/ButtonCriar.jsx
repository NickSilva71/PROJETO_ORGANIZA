import { IconButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export default function ButtonCriar({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      aria-label="Adicionar nova notificação"
      icon={<FaPlus />}
      size="lg"
      h="100%"
      cursor="pointer"
      p={6}
    />
  );
}
