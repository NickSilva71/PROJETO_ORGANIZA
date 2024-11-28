import { useState, useEffect } from "react";
import { Flex, SimpleGrid, Heading, Button, useDisclosure, useColorMode, useToast, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun, FaExclamationTriangle, FaPlus } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import ModalCriarNotificacao from "@/components/notificacao/ModalCriarNotificacao";
import CardNotificacao from "@/components/notificacao/CardNotificacao";
import VerificarAutenticacao from "@/components/VerificarAutenticacao";

function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const userId = localStorage.getItem("token");

  const formatarData = (dataISO) => {
    const dataObjeto = new Date(dataISO);
    const dia = String(dataObjeto.getDate()).padStart(2, "0");
    const mes = String(dataObjeto.getMonth() + 1).padStart(2, "0");
    const ano = dataObjeto.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Verificar lembretes
  useEffect(() => {
    const verificarLembretes = () => {
      const hoje = formatarData(new Date().toISOString()); // Data atual no formato DD/MM/AAAA

      notificacoes.forEach((notificacao) => {
        if (notificacao.date === hoje) {
          toast({
            title: "Lembrete Vencendo!",
            description: `Atenção: ${notificacao.name} vence hoje!`, // Corrigido para interpolação de string
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    };

    // Verifica os lembretes ao carregar a página
    verificarLembretes();

    // Opcional: Verificar lembretes a cada 30 segundos
    const interval = setInterval(verificarLembretes, 30000);

    return () => clearInterval(interval);
  }, [notificacoes, toast]); // Dependência de notificações e toast




  useEffect(() => {
    async function fetchNotificacoes() {
      try {
        const response = await fetch(`http://localhost:8000/notifications?userId=${userId}`);
        if (!response.ok) throw new Error("Erro ao buscar Notificações");
        const data = await response.json();
        setNotificacoes(data);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar as notificações.",
          status: "error",
          duration: 3000,
          isClosable: true,
          icon: <FaExclamationTriangle size="Big" color="yellow" />,
        });
      }
    }
    fetchNotificacoes();
  }, [userId, toast]);

  const handleNotificacao = async (dadosNotificacao) => {
    try {
      const novaNotificacao = { ...dadosNotificacao, userId };
      const response = await fetch("http://localhost:8000/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaNotificacao),
      });
      if (!response.ok) throw new Error("Erro ao criar notificação");
      const data = await response.json();
      setNotificacoes((prev) => [...prev, data]);
      toast({ title: "Notificação criada", status: "success", duration: 3000, isClosable: true });
    } catch {
      toast({ title: "Erro", description: "Não foi possível criar a notificação.", status: "error", duration: 3000, isClosable: true });
    } finally {
      onClose();
    }
  };

  const handleDeleteNotificacao = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/notifications/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao excluir notificação");
      setNotificacoes((prev) => prev.filter((notificacao) => notificacao.id !== id));
      toast({ title: "Notificação excluída", status: "success", duration: 3000, isClosable: true });
    } catch {
      toast({ title: "Erro", description: "Não foi possível excluir a notificação.", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <Flex>
      <Flex direction="column" p={6} ml={{ base: 0, md: "200px" }} gap={6} w="100%">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h1">Notificações e Lembretes</Heading>
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <FaMoon /> : <FaSun />}</Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {/* Botão de adicionar */}
          <IconButton
            onClick={onOpen}
            aria-label="Adicionar nova notificação"
            icon={<FaPlus />}
            size="lg"
            h="100%"
            cursor="pointer"
            p={6}
          />
          {notificacoes.map((notificacao) => (
            <CardNotificacao
              key={notificacao.id}
              notificacao={notificacao}
              onDelete={handleDeleteNotificacao}
            />
          ))}
        </SimpleGrid>
      </Flex>

      <ModalCriarNotificacao isOpen={isOpen} onClose={onClose} onSubmit={handleNotificacao} />

      <Sidebar />
    </Flex>
  );
}

export default VerificarAutenticacao(Notificacoes);