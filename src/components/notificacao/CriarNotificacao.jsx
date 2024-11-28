import { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, VStack, Button, InputGroup, InputLeftElement, Text, useToast } from "@chakra-ui/react";
import { FaBell, FaBookOpen, FaDollarSign } from "react-icons/fa";

const CriarNotificacao = ({ onSubmit, notificacoes = [] }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");
  const [dataFormatada, setDataFormatada] = useState("");
  const toast = useToast();

  // Função para formatar a data no formato DD/MM/AAAA
  const formatarData = (data_limite) => {
    const dataObjeto = new Date(data_limite);
    const dia = String(dataObjeto.getDate() + 1).padStart(2, "0");
    const mes = String(dataObjeto.getMonth() + 1).padStart(2, "0");
    const ano = dataObjeto.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Formatar a data ao selecionar no input
  useEffect(() => {
    if (data) {
      setDataFormatada(formatarData(data));
    }
  }, [data]);



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: nome, description: descricao, date: dataFormatada, value: valor });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} px={4} pb={4}>
        {/* Nome da notificação */}
        <FormControl id="nome" isRequired>
          <FormLabel>Nome da Notificação</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaBell color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Título da Notificação"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        {/* Descrição da notificação */}
        <FormControl id="descricao" isRequired>
          <FormLabel>Descrição</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaBookOpen color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Descreva esta notificação"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        {/* Data de vencimento */}
        <FormControl id="data" isRequired>
          <FormLabel>Data</FormLabel>
          <Input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </FormControl>

        {/* Valor da notificação */}
        <FormControl id="valor" isRequired>
          <FormLabel>Valor</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaDollarSign color="gray.300" />
            </InputLeftElement>
            <Input
              type="number"
              placeholder="Ex: 100,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Criar Notificação
        </Button>
      </VStack>
    </form>
  );
}

export default CriarNotificacao;
