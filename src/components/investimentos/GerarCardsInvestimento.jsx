// Termino depois

import { Flex, SimpleGrid, Card, Heading, Text, IconButton, Button} from "@chakra-ui/react";
import { FaMoneyBill, FaBuilding, FaPercentage, FaRegClock, FaTrashAlt, FaEdit } from "react-icons/fa";


const CardInvestimento = ({arrayInvestimentos, handleDelete, handleEdit}) => {

  return (
    
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>

      {arrayInvestimentos.map(investimento => (
        <Card key={investimento.id} p={4} borderWidth={2} borderColor="gray.300" borderRadius="lg" boxShadow="lg">

          {/* Corpo do card */}
          <Heading size="md" mb={4}>{investimento.tipo}</Heading>
          <Flex direction="column" gap="2">
            <Text><FaMoneyBill/> Valor: {" " + toBrl(investimento.valor)}</Text>
            <Text><FaBuilding/> Instituição: {investimento.instituicao}</Text>
            <Text><FaPercentage/> Juros: {investimento.juros}%</Text>
            <Text><FaRegClock/> Tempo: {investimento.tempo} anos</Text>
            <Text>Retorno estimado: <strong>{" " + toBrl(investimento.retorno)}</strong></Text>
          </Flex>

          {/* POST e DELETE */}
          <Flex justifyContent="space-between" mt={4}>
            <Button size="sm" colorScheme="blue" onClick={() => handleEdit(investimento)}>
              <FaEdit />
            </Button>

            <Button size="sm" colorScheme="red" onClick={() => handleDelete(investimento.id)}>
              <FaTrashAlt />
            </Button>
          </Flex>
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default CardInvestimento;