import React from 'react';
import { transactions } from '../../data/mockData'; 

const TransactionsList: React.FC = () => {
  return (
    <div className="transactions-container">
      <h3 style={{ marginBottom: '16px', fontSize: '18px', color: '#1A1D21' }}>
        Transações de Diva
      </h3>
      
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Valor</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((t: any) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td className={`amount ${t.type}`}>
                  {t.amount.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </td>
                <td>
                  <span className="tag-category">{t.category}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: '20px' }}>
                Nenhuma transação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;