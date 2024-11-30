import { Flex, SimpleGrid, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Heading, useDisclosure, useColorMode, Button, useToast } from "@chakra-ui/react";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import CardRegistro from "@/components/receitas/CardRegistro";
import ModalRegistro from "@/components/receitas/ModalRegistro";
import ConfirmarDeletar from "@/components/ModalConfirmarDeletar";
import VerificarAutenticacao from "@/components/VerificarAutenticacao";

import { fetchRegistros, createRegistro, deleteRegistro, updateRegistro } from "@/api/api";

function ReceitasDespesas() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const toast = useToast();

  const [registros, setRegistros] = useState([]);
  const [novoRegistro, setNovoRegistro] = useState({ tipo: "", categoria: "", data: "", valor: "", descricao: "" });
  const [registroParaExcluir, setRegistroParaExcluir] = useState(null);

  const arrayCategorias = {
    Receita: ["Salário", "Freelance", "Investimentos", "Presentes", "Aluguel Recebido"],
    Despesa: ["Aluguel/Moradia", "Energia Elétrica", "Água", "Alimentação", "Saúde", "Transporte", "Lazer"],
  };

  const userId = localStorage.getItem("token");

  const loadRegistros = async () => {
    try {
      const { data } = await fetchRegistros(userId);
      setRegistros(data);
    } catch (error) {
      toast({
        title: "Erro ao buscar registros",
        description: error.message || "Não foi possível conectar ao servidor",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) =>
    setNovoRegistro((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      if (novoRegistro.id) {
        // Atualizar registro
        const { data } = await updateRegistro(novoRegistro.id, novoRegistro);

        setRegistros((prev) =>
          prev.map((item) => (item.id === data.id ? data : item))
        );

        toast({
          title: "Registro atualizado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

      } else {
        // Criar novo registro
        const registro = { ...novoRegistro, userId };
        const { data } = await createRegistro(registro);

        setRegistros((prev) => [...prev, data]);

        toast({
          title: "Registro salvo com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      // Limpar formulário e fechar modal
      setNovoRegistro({ tipo: "", categoria: "", data: "", valor: "", descricao: "" });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao salvar registro",
        description: error.message || "Não foi possível conectar ao servidor",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRegistro(registroParaExcluir);
      setRegistros((prev) => prev.filter((item) => item.id !== registroParaExcluir)); // Remove o registro excluído
      toast({
        title: "Registro excluído com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose();
    } catch (error) {
      toast({
        title: "Erro ao excluir registro",
        description: error.message || "Não foi possível conectar ao servidor",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  

  useEffect(() => {
    loadRegistros();
  }, []);

  return (
    <Flex>
      <Sidebar />
      <Flex direction="column" p={6} ml={{ base: 0, md: "200px" }} w="100%">
        <Flex justifyContent="space-between" mb={6}>
          <Heading>Receitas e Despesas</Heading>
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <FaMoon /> : <FaSun />}</Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {registros.map((item) => (
            <CardRegistro
              key={item.id}
              registro={item}
              onEdit={() => {
                setNovoRegistro(item);
                onOpen();
              }}
              onDelete={() => {
                setRegistroParaExcluir(item.id);
                onDeleteOpen();
              }}
            />
          ))}
        </SimpleGrid>

        <IconButton
          icon={<FaPlus />}
          colorScheme="teal"
          isRound
          size="lg"
          position="fixed"
          bottom="20px"
          right="20px"
          onClick={onOpen}
        />

        <ModalRegistro
          isOpen={isOpen}
          onClose={onClose}
          registro={novoRegistro}
          arrayCategorias={novoRegistro.tipo ? arrayCategorias[novoRegistro.tipo] : []}
          onSave={handleSave}
          handleChange={handleChange}
        />

        <ConfirmarDeletar
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          onConfirm={handleDelete}
          tipo={registroParaExcluir ? "registro" : ""}
        />
      </Flex>
    </Flex>
  );
}

export default VerificarAutenticacao(ReceitasDespesas);