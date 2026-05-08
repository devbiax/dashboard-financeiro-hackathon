import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Seg', valor: 400 },
  { name: 'Ter', valor: 700 },
  { name: 'Qua', valor: 500 },
  { name: 'Qui', valor: 900 },
  { name: 'Sex', valor: 600 },
  { name: 'Sáb', valor: 300 },
  { name: 'Dom', valor: 200 },
];

const MainChart = () => {
  const sakuraKiss = "#9E4A69";
  const blossomBlush = "#C67C96";
  const cherryMist = "#E8C8D9";

  return (
    <div style={{ 
      width: '100%', 
      height: 300, 
      backgroundColor: '#FFFFFF', 
      padding: '20px', 
      borderRadius: '16px', 
      border: '1px solid #E8C8D9',
      marginTop: '20px' 
    }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', color: sakuraKiss }}>
        Gastos dos últimos 7 dias
      </h3>
      
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8C8D9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#71767D', fontSize: 12}} 
          />
          <YAxis hide />
          <Tooltip 
            cursor={{fill: cherryMist, opacity: 0.4}} 
            contentStyle={{
              borderRadius: '8px', 
              border: `1px solid #D6A1B5`, 
              boxShadow: '0 4px 12px rgba(158, 74, 105, 0.1)'
            }}
            formatter={(value) => `R$ ${value}`}
          />
          <Bar dataKey="valor" radius={[6, 6, 0, 0]} barSize={35}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.valor > 700 ? sakuraKiss : blossomBlush} 
                style={{ transition: 'fill 0.3s ease' }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MainChart;