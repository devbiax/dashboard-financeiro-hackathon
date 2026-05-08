import React from 'react';
// @ts-ignore
import './styles/dashboard.css';

import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import InsightsGrid from './components/Insights/InsightsGrid';
import SummaryCard from './components/SummaryCard/SummaryCard';
import MainChart from './components/Charts/MainChart';
import TransactionsList from './components/Transactions/TransactionsList';
import { transactions, Transaction } from './data/mockData';

const App: React.FC = () => {
  const income = transactions
    .filter((item: any) => item.type === 'income')
    .reduce((acc, item) => acc + item.amount, 0);

  const expenses = transactions
    .filter((item: any) => item.type === 'expense')
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income - expenses;

  // Cálculo da meta com segurança para não dividir por zero
  const goal = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="dashboard-body">
          
          <section className="dashboard-main-column">
            <div className="summary-grid">
              <SummaryCard
                title="Saldo Total"
                value={balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              />
              <SummaryCard
                title="Receitas"
                value={income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                variationClass="positive"
              />
              <SummaryCard
                title="Despesas"
                value={expenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                variationClass="negative"
              />
              <SummaryCard
                title="Meta Mensal"
                value={`${goal.toFixed(0)}%`}
              />
            </div>

            {goal > 80 && (
              <div className="alert-banner">
                <div className="alert-content">
                  <strong>Alerta de Meta:</strong> Você já atingiu {goal.toFixed(0)}% do seu limite mensal. 
                  Hora de segurar os gastos, Diva!
                </div>
              </div>
            )}

            <InsightsGrid />
            <MainChart />
          </section>

          <aside className="right-panel">
            <TransactionsList />
          </aside>
          
        </div>
      </main>
    </div>
  );
}

export default App;