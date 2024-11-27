import { useState, useEffect } from 'react';

const InvestimentoNotificacion = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [investimento, setInvestimento] = useState(null);
  const [valorAtual, setValorAtual] = useState(0);

  useEffect(() => {
    // Busca os dados do investimento
    const fetchInvestimento = async () => {
      const response = await fetch('/api/investimento');
      const data = await response.json();

      setInvestimento(data);

      const dataInicio = new Date(data.dataInicio);
      const hoje = new Date();

      // Calcula os dias decorridos desde o início
      const diffDias = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));

      // Verifica se já passaram 30 dias
      if (diffDias >= 30) {
        setShowNotification(true);
      }

      // Calcula o valor atualizado do investimento
      const valorAtualizado = data.valorInicial * Math.pow(1.2, diffDias);
      setValorAtual(valorAtualizado);
    };

    fetchInvestimento();
  }, []);

  return (
    <div>
      {investimento && (
        <div>
          <h2>Investimento #{investimento.id}</h2>
          <p>Valor Inicial: R$ {investimento.valorInicial.toFixed(2)}</p>
          <p>Data de Início: {new Date(investimento.dataInicio).toLocaleDateString()}</p>
          <p>Valor Atualizado: R$ {valorAtual.toFixed(2)}</p>
        </div>
      )}
      {showNotification && (
        <div style={{ padding: '10px', backgroundColor: '#ccffcc', border: '1px solid #00cc00' }}>
          <p>Você já pode fazer o resgate do seu investimento! Parabéns!</p>
        </div>
      )}
    </div>
  );
};

export default InvestimentoNotificacion;