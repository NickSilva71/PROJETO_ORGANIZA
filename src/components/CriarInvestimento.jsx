import { useState } from "react";
import { FormControl, FormLabel, Input, NumberInput, NumberInputField, VStack, Button } from "@chakra-ui/react";

export default function CriarInvestimento({ onSubmit }) {
  const [tipo, setTipo]               = useState("");
  const [valor, setValor]             = useState(0);
  const [instituicao, setInstituicao] = useState("");
  const [juros, setJuros]             = useState(0);
  const [tempo, setTempo]             = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação dos campos
    if (valor <= 0 || juros <= 0 || tempo <= 0 || !tipo || !instituicao) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    onSubmit({ tipo, valor, instituicao, juros, tempo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} px={4} pb={4}>
        <FormControl id="tipo" isRequired>
          <FormLabel>Tipo</FormLabel>
          <Input
            placeholder="Poupança"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </FormControl>

        <FormControl id="valor" isRequired>
          <FormLabel>Valor</FormLabel>
          <NumberInput
            min={0.01}
            precision={2}
            onChange={(valueString) => setValor(parseFloat(valueString))}
          >
            <NumberInputField placeholder="2000.00" />
          </NumberInput>
        </FormControl>

        <FormControl id="instituicao" isRequired>
          <FormLabel>Instituição</FormLabel>
          <Input
            placeholder="Caixa Econômica Federal"
            value={instituicao}
            onChange={(e) => setInstituicao(e.target.value)}
          />
        </FormControl>

        <FormControl id="juros" isRequired>
          <FormLabel>Juros ao ano</FormLabel>
          <NumberInput
            min={0.01}
            onChange={(valueString) => setJuros(parseFloat(valueString))}
          >
            <NumberInputField placeholder="10,40%" />
          </NumberInput>
        </FormControl>

        <FormControl id="tempo" isRequired>
          <FormLabel>Tempo</FormLabel>
          <NumberInput
            min={1}
            onChange={(valueString) => setTempo(parseInt(valueString))}
          >
            <NumberInputField placeholder="3 anos" />
          </NumberInput>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Criar Investimento
        </Button>
      </VStack>
    </form>
  );
}
