import React, { useState } from 'react';
import './styles/dashboard.css';

import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import InsightsGrid from './components/Insights/InsightsGrid';
import SummaryCard from './components/SummaryCard/SummaryCard';
import MainChart from './components/Charts/MainChart';
import TransactionsList from './components/Transactions/TransactionsList';
import { TransactionForm } from './components/Transactions/TransactionForm';
import { BudgetWidget, PatternInsightsWidget } from './components/Layout/AsideWidgets';
import { transactions as initialData, type Transaction } from './data/mockData';
import { getFinanceSummary, getLastSevenDaysChartData } from './utils/financeAnalytics';
import { formatFinancialDate, getTodayFinancialDate } from './utils/dateUtils';

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const normalizeTransaction = (transaction: Partial<Transaction>): Transaction => {
  const type = transaction.type === 'income' ? 'income' : 'expense';
  const fallbackCategory = type === 'income' ? 'Receita' : 'Necessidades';
  const categoryMap: Record<string, string> = {
    Salario: 'Receita',
    Salário: 'Receita',
    Freelance: 'Receita',
    Delivery: 'Desejos',
    Streaming: 'Desejos',
    Transporte: 'Necessidades',
  };

  return {
    id: String(transaction.id || crypto.randomUUID()),
    description: transaction.description || transaction.category || 'Transação sem descrição',
    category: categoryMap[transaction.category || ''] || transaction.category || fallbackCategory,
    type,
    amount: Number(transaction.amount || 0),
    date: transaction.date ? formatFinancialDate(transaction.date) : getTodayFinancialDate(),
  };
};

const App: React.FC = () => {
  const [transactionsList, setTransactionsList] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finapp_transactions');
    const transactions = saved ? JSON.parse(saved) : initialData;
    const normalized = transactions.map(normalizeTransaction);
    localStorage.setItem('finapp_transactions', JSON.stringify(normalized));
    return normalized;
  });

  const handleAddTransaction = (newTransaction: Transaction) => {
    const updated = [newTransaction, ...transactionsList];
    setTransactionsList(updated);
    localStorage.setItem('finapp_transactions', JSON.stringify(updated));
  };

  const deleteTransaction = (id: string) => {
    const updated = transactionsList.filter((transaction) => transaction.id !== id);
    setTransactionsList(updated);
    localStorage.setItem('finapp_transactions', JSON.stringify(updated));
  };

  const summary = getFinanceSummary(transactionsList);
  const chartData = getLastSevenDaysChartData(transactionsList);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="dashboard-container">
          <section className="main-column">
            <div className="summary-grid">
              <SummaryCard title="Saldo total" value={formatCurrency(summary.balance)} />
              <SummaryCard title="Receitas" value={formatCurrency(summary.income)} variationClass="positive" />
              <SummaryCard title="Despesas" value={formatCurrency(summary.expenses)} variationClass="negative" />
              <SummaryCard title="Meta mensal" value={`${summary.savingsRate.toFixed(0)}%`} />
              <SummaryCard title="Média por gasto" value={formatCurrency(summary.averageExpense)} />
              <SummaryCard
                title="Variação semanal"
                value={`${summary.weeklyVariation.toFixed(0)}%`}
                variationClass={summary.weeklyVariation <= 0 ? 'positive' : 'negative'}
              />
            </div>

            <TransactionForm onAddTransaction={handleAddTransaction} />

            {summary.savingsRate < 20 && summary.income > 0 && (
              <div className="alert-banner">
                <div className="alert-content">
                  <strong>Alerta de meta:</strong> seu saldo livre está baixo ({summary.savingsRate.toFixed(0)}%).
                  Revise os gastos para manter o orçamento saudável.
                </div>
              </div>
            )}

            <InsightsGrid transactions={transactionsList} />

            <div className="chart-card">
              <h3 className="chart-title">Entradas e saídas dos últimos 7 dias</h3>
              <MainChart data={chartData} />
            </div>

            <TransactionsList transactions={transactionsList} onDeleteTransaction={deleteTransaction} />
          </section>

          <aside className="side-column">
            <BudgetWidget transactions={transactionsList} />
            <PatternInsightsWidget transactions={transactionsList} />
          </aside>

          <footer className="dashboard-footer">© 2026 FinApp · Projeto final Elas+ Tech</footer>
        </div>
      </main>
    </div>
  );
};

export default App;
