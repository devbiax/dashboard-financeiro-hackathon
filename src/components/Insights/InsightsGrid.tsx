import React from 'react';
import { CloudRain, Target, Calendar } from 'lucide-react';

const InsightsGrid: React.FC = () => {
  return (
    <div className="insights-container">
      <div className="insight-card">
        <CloudRain size={20} color="#7F56D9" />
        <div>
          <h4>Clima</h4>
          <p>Previsão de chuva: cuidado com gastos de transporte hoje!</p>
        </div>
      </div>

      <div className="insight-card">
        <Target size={20} color="#12B76A" />
        <div>
          <h4>Meta</h4>
          <p>Você já atingiu 73% do limite de lazer do mês.</p>
        </div>
      </div>

      <div className="insight-card">
        <Calendar size={20} color="#2E90FA" />
        <div>
          <h4>Eventos</h4>
          <p>2 eventos com impacto financeiro esta semana.</p>
        </div>
      </div>
    </div>
  );
};

<div className="alert-banner">
  <p>⚠️ <strong>Alerta amarelo:</strong> os custos estão no limite da meta mensal. Recomendado evitar novos gastos.</p>
</div>

export default InsightsGrid;