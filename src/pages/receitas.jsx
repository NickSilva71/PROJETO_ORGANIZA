import Sidebar from "@/components/Sidebar";
import {
  Flex,
  SimpleGrid,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
  useDisclosure,
  useColorMode,
  Button,
  Input,
  Select,
  Textarea,
  VStack,
  Text,
  Card
} from "@chakra-ui/react";
import { FaPlus, FaMoon, FaSun, FaTrash, FaEdit, FaMoneyBill, FaBuilding, FaRegClock, FaWallet } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function ReceitasDespesas() {
  // Categorias pré-definidas
  const categoriasReceitas = ["Salário", "Freelance", "Investimentos", "Presentes", "Aluguel Recebido"];
  const categoriasDespesas = [
    "Aluguel/Moradia",
    "Energia Elétrica",
    "Água",
    "Alimentação",
    "Saúde",
    "Transporte",
    "Lazer",
  ];

  // Estado e funcionalidades
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [registros, setRegistros] = useState([]);
  const [novoRegistro, setNovoRegistro] = useState({
    tipo: "",
    categoria: "",
    data: "",
    valor: "",
    descricao: "",
  });

  const [registroParaExcluir, setRegistroParaExcluir] = useState(null);

  // Carregar registros do localStorage ao montar o componente
  useEffect(() => {
    const registrosSalvos = localStorage.getItem("registros");
    if (registrosSalvos) {
      setRegistros(JSON.parse(registrosSalvos));
    }
  }, []);

  // Salvar registros no localStorage sempre que a lista for atualizada
  useEffect(() => {
    if (registros.length > 0) {
      localStorage.setItem("registros", JSON.stringify(registros));
    }
  }, [registros]);

  // Funções
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoRegistro((prev) => ({ ...prev, [name]: value }));
  };

  const adicionarRegistro = () => {
    const novoReg = { ...novoRegistro, id: Date.now() };
    const novosRegistros = [...registros, novoReg];
    setRegistros(novosRegistros);
    setNovoRegistro({ tipo: "", categoria: "", data: "", valor: "", descricao: "" });
    localStorage.setItem("registros", JSON.stringify(novosRegistros)); // Atualiza o localStorage
    onClose();
  };

  const editarRegistro = (id) => {
    const registro = registros.find((item) => item.id === id);
    setNovoRegistro(registro);
    onOpen();
    setRegistros((prev) => prev.filter((item) => item.id !== id)); // Remove do estado
  };

  const excluirRegistro = () => {
    // Remove do estado e do localStorage
    const novosRegistros = registros.filter((item) => item.id !== registroParaExcluir);
    setRegistros(novosRegistros);
    localStorage.setItem("registros", JSON.stringify(novosRegistros)); // Atualiza o localStorage
    setRegistroParaExcluir(null);
    onDeleteClose();
  };

  const confirmarExclusao = (id) => {
    setRegistroParaExcluir(id);
    onDeleteOpen();
  };

  return (
    <Flex>
      <Flex
        direction="column"
        p={6}
        ml={{ base: 0, md: "200px" }}
        mb={{ base: "80px", md: 0 }}
        gap={6}
        w="100%"
      >
        <Flex justifyContent="space-between" align="center" mb={6}>
          <Heading as="h1">Receitas e Despesas</Heading>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </Flex>

        {/* Conteúdo Principal */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {registros.map((item) => (
            <Card
              key={item.id}
              p={4}
              borderWidth={2}
              borderColor="gray.300"
              borderRadius="lg"
              boxShadow="lg"
              variant="outline"
            >
              <Heading size="base" mb={4}>
                <Flex align="center">
                  <FaWallet color="gray.300" />
                  <Text ml={2}>{item.categoria}</Text>
                </Flex>
              </Heading>
              <Flex direction="column" gap={2}>
                <Flex align="center">
                  <FaMoneyBill color="gray.300" />
                  <Text ml={2}>
                    Valor: {parseFloat(item.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </Text>
                </Flex>
                <Flex align="center">
                  <FaBuilding color="gray.300" />
                  <Text ml={2}>Descrição: {item.descricao}</Text>
                </Flex>
                <Flex align="center">
                  <FaRegClock color="gray.300" />
                  <Text ml={2}>Data: {item.data}</Text>
                </Flex>
              </Flex>
              <Flex justifyContent="flex-end" gap={2} mt={3}>
                <IconButton
                  icon={<FaEdit />}
                  aria-label="Editar registro"
                  size="sm"
                  onClick={() => editarRegistro(item.id)}
                />
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Excluir registro"
                  size="sm"
                  colorScheme="red"
                  onClick={() => confirmarExclusao(item.id)}
                />
              </Flex>
            </Card>
          ))}
          {/* Botão de adicionar */}
          <IconButton
            onClick={onOpen}
            aria-label="Adicionar novo registro"
            icon={<FaPlus />}
            size="lg"
            h="100%"
            cursor="pointer"
            p={6}
          />
        </SimpleGrid>
      </Flex>

      {/* Modal para criar ou editar registro */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="h2" alignSelf="center">
            {novoRegistro.id ? "Editar Registro" : "Criar Novo Registro"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {/* Seleção de tipo */}
              <Select
                placeholder="Selecione o tipo"
                name="tipo"
                value={novoRegistro.tipo}
                onChange={handleChange}
              >
                <option value="Receita">Receita</option>
                <option value="Despesa">Despesa</option>
              </Select>

              {/* Categoria baseada no tipo */}
              {novoRegistro.tipo && (
                <Select
                  placeholder="Selecione a categoria"
                  name="categoria"
                  value={novoRegistro.categoria}
                  onChange={handleChange}
                >
                  {(novoRegistro.tipo === "Receita" ? categoriasReceitas : categoriasDespesas).map(
                    (categoria, index) => (
                      <option key={index} value={categoria}>
                        {categoria}
                      </option>
                    )
                  )}
                </Select>
              )}

              {/* Outros campos */}
              <Input
                type="date"
                name="data"
                value={novoRegistro.data}
                onChange={handleChange}
              />
              <Input
                type="number"
                placeholder="Valor"
                name="valor"
                value={novoRegistro.valor}
                onChange={handleChange}
              />
              <Textarea
                placeholder="Descrição"
                name="descricao"
                value={novoRegistro.descricao}
                onChange={handleChange}
              />
              <Button colorScheme="teal" onClick={adicionarRegistro} w="full">
                Salvar
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Tem certeza de que deseja excluir este registro?</Text>
            <Flex justifyContent="flex-end" gap={2} mt={4}>
              <Button colorScheme="gray" onClick={onDeleteClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={excluirRegistro}>
                Excluir
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Sidebar />
    </Flex>
  );
}
