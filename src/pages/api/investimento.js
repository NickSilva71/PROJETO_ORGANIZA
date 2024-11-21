export default function handler(req, res) {
  // Dados simulados do investimento
  const investimento = {
    id: 'Investimento  1',
    valorInicial: 1000.0, // Valor inicial do investimento
    dataInicio: '2024-11-15', // Data de início do investimento
  };

  res.status(200).json(investimento);
}