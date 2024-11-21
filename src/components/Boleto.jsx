import { useState, useEffect } from 'react';

const BoletoNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [boleto, setBoleto] = useState(null);

  useEffect(() => {
    // Consulta a API do boleto
    const fetchBoleto = async () => {
      const response = await fetch('/api/boleto');
      const data = await response.json();

      setBoleto(data);

      // Verifica se o boleto venceu há mais de 30 dias
      const vencimento = new Date(data.vencimento);
      const hoje = new Date();
      const diffDias = Math.floor((hoje - vencimento) / (1000 * 60 * 60 * 24));

      if (diffDias > 30) {
        setShowNotification(true);
      }
    };

    fetchBoleto();
  }, []);

  return (
    <div>
      {boleto && (
        <div>
          <h2>Boleto #{boleto.id}</h2>
          <p>Valor: R$ {boleto.valor.toFixed(2)}</p>
          <p>Vencimento: {new Date(boleto.vencimento).toLocaleDateString()}</p>
        </div>
      )}
      {showNotification && (
        <div style={{ padding: '10px', backgroundColor: '#ffcccc', border: '1px solid #ff0000' }}>
          <p style={{color: 'black'}}>Seu boleto venceu há mais de 30 dias! Por favor, regularize sua situação.</p>
        </div>
      )}
    </div>
  );
};

export default BoletoNotification;