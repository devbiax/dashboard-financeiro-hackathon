import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  return (
    <div style={{ width: '100%', height: 300, backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E6E8EC', marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#1A1D21' }}>Gastos dos últimos 7 dias</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E8EC" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71767D', fontSize: 12}} />
          <YAxis hide />
          <Tooltip 
  cursor={{fill: '#F8F9FD'}} 
  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}
  formatter={(value) => `R$ ${value}`}
/>
          <Bar dataKey="valor" fill="#6D54D1" radius={[4, 4, 0, 0]} barSize={35} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MainChart;