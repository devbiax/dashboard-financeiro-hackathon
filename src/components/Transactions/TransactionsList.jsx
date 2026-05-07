import React from 'react';
import { transactions } from '../../data/mockData';

const TransactionsList = () => {
  return (
    <div className="transactions-container">
      <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#1A1D21' }}>
        Transações Recentes
      </h3>
      
      <div className="transactions-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {transactions.map((item) => (
          <div key={item.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingBottom: '12px',
            borderBottom: '1px solid #F8F9FD'
          }}>
            <div>
              <p style={{ margin: 0, fontWeight: 500, fontSize: '14px', color: '#1A1D21' }}>
                {item.category}
              </p>
              <span style={{ fontSize: '12px', color: '#71767D' }}>
                {item.type === 'income' ? 'Receita' : 'Despesa'}
              </span>
            </div>
            
            <p style={{ 
              margin: 0, 
              fontWeight: 600, 
              fontSize: '14px',
              color: item.type === 'income' ? '#27A770' : '#EE4F50' 
            }}>
              {item.type === 'income' ? '+' : '-'} {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;