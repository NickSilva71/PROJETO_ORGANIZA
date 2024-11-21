export default function handler(req, res) {
    // Dados simulados do boleto
    const boleto = {
      id: '1',
      valor: 200.0,
      vencimento: '2024-10-18', // Exemplo: data de vencimento do boleto
    };
  
    res.status(200).json(boleto);
  }