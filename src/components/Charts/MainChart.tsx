import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ChartPoint } from '../../utils/financeAnalytics';

interface MainChartProps {
  data: ChartPoint[];
}

const MainChart: React.FC<MainChartProps> = ({ data }) => {
  const cherryMist = '#E8C8D9';

  return (
    <div className="chart-inner">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8C8D9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71767D', fontSize: 12 }} />
          <YAxis hide />
          <Tooltip
            cursor={{ fill: cherryMist, opacity: 0.4 }}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #D6A1B5',
              boxShadow: '0 4px 12px rgba(158, 74, 105, 0.1)',
            }}
            labelFormatter={(label) => `Dia: ${label}`}
            formatter={(value) =>
              Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="entrada" name="Entrada" fill="#10B981" radius={[6, 6, 0, 0]} barSize={24} />
          <Bar dataKey="saida" name="Saída" fill="#9E4A69" radius={[6, 6, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MainChart;
