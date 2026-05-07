import './styles/dashboard.css'

import Sidebar from './components/Sidebar/Sidebar'
import SummaryCard from './components/SummaryCard/SummaryCard'
import MainChart from './components/Charts/MainChart'
import TransactionsList from './components/Transactions/TransactionsList';
import { transactions } from './data/mockData'

function App() {
  const income = transactions
  .filter(item => item.type === 'income')
  .reduce((acc, item) => acc + item.amount, 0)

  const expenses = transactions
  .filter(item => item.type === 'expense')
  .reduce((acc, item) => acc + item.amount, 0)

  const balance = income - expenses

  const biggestExpense = transactions
  .filter(item => item.type === 'expense')
  .sort((a, b) => b.amount - a.amount)[0]

  const goal = ((income - expenses) / income) * 100

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

        <div className="header">
          <h1>Olá, Illana! 👋</h1>

          <p>
            Vamos juntos alcançar seus objetivos financeiros.
          </p>
        </div>

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

        <MainChart />

      </main>

      <section className="right-panel">
        <TransactionsList />
      </section>

    </div>
  )
}

export default App