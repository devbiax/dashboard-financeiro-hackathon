import React, { useState } from 'react';
import { AlertTriangle, Calculator, Repeat } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { Transaction } from '../../data/mockData';
import { getCategoryBreakdown, getFinanceSummary } from '../../utils/financeAnalytics';

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const BudgetWidget = ({ transactions }: { transactions: Transaction[] }) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState(() => {
    const savedGoal = localStorage.getItem('finapp_monthly_goal');
    return savedGoal ? Number(savedGoal) : 1800;
  });
  const [draftGoal, setDraftGoal] = useState(String(monthlyGoal));

  const categoryColors: Record<string, string> = {
    Necessidades: '#9E4A69',
    Desejos: '#C67C96',
    Investimentos: '#D6A1B5',
  };

  const categoryLabels: Record<string, string> = {
    Necessidades: 'Essenciais',
    Desejos: 'Estilo de Vida',
    Investimentos: 'Investimentos',
  };

  const categories = getCategoryBreakdown(transactions).map((category) => ({
    name: categoryLabels[category.name],
    value: category.amount,
    pct: Math.round(category.budgetPct),
    color: categoryColors[category.name],
  })).filter((category) => category.value > 0);

  const currentExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const goalProgress = monthlyGoal > 0 ? Math.round((currentExpenses / monthlyGoal) * 100) : 0;
  const progressWidth = Math.min(goalProgress, 100);

  const handleSaveGoal = () => {
    const parsedGoal = Number(draftGoal);

    if (!Number.isFinite(parsedGoal) || parsedGoal <= 0) return;

    setMonthlyGoal(parsedGoal);
    localStorage.setItem('finapp_monthly_goal', String(parsedGoal));
    setIsEditingGoal(false);
  };

  return (
    <div className="widget-card">
      <div className="budget-goal-card">
        <h4 className="budget-goal-title">Sua Meta Mensal</h4>

        <div className="budget-goal-values">
          <p>
            <strong>Meta:</strong> {formatCurrency(monthlyGoal)}
          </p>
          <p>
            <strong>Gasto atual:</strong> {formatCurrency(currentExpenses)}
          </p>
        </div>

        <div className="budget-progress-row">
          <div className="budget-progress-track">
            <div
              className={`budget-progress-fill ${goalProgress > 100 ? 'is-over' : ''}`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <span className={`budget-progress-value ${goalProgress > 100 ? 'is-over' : ''}`}>{goalProgress}%</span>
        </div>

        {isEditingGoal ? (
          <div className="budget-goal-edit">
            <input
              type="number"
              min="1"
              value={draftGoal}
              onChange={(event) => setDraftGoal(event.target.value)}
              aria-label="Nova meta mensal"
            />
            <button type="button" onClick={handleSaveGoal}>
              Salvar
            </button>
          </div>
        ) : (
          <button type="button" className="budget-edit-button" onClick={() => setIsEditingGoal(true)}>
            Editar meta
          </button>
        )}
      </div>

      <h4 className="widget-title budget-breakdown-title">
        Budget <span className="widget-subtitle">Por categoria</span>
      </h4>

      <div className="budget-donut">
        {categories.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                stroke="#FFFFFF"
                strokeWidth={3}
              >
                {categories.map((category) => (
                  <Cell key={category.name} fill={category.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{
                  border: '1px solid #E8C8D9',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(158, 74, 105, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="budget-donut-empty">Sem despesas</div>
        )}
      </div>

      <div className="widget-list">
        {categories.map((category) => (
          <div key={category.name} className="widget-item-row">
            <span className="item-label">
              <span className="dot" style={{ backgroundColor: category.color }} />
              {category.name}
            </span>
            <span className="item-value">{category.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PatternInsightsWidget = ({ transactions }: { transactions: Transaction[] }) => {
  const summary = getFinanceSummary(transactions);
  const insights = [
    {
      title: 'Média de gastos',
      text: `Cada despesa fica em torno de ${formatCurrency(summary.averageExpense)}.`,
      icon: Calculator,
      isAlert: false,
    },
    {
      title: 'Padrão recorrente',
      text: `Categoria mais frequente: ${summary.frequentExpenseCategory}.`,
      icon: Repeat,
      isAlert: false,
    },
    {
      title: 'Acima da média',
      text: `${summary.aboveAverageCount} transação(ões) passaram da média.`,
      icon: AlertTriangle,
      isAlert: summary.aboveAverageCount > 0,
    },
  ];

  return (
    <div className="widget-card compact-insights-card">
      <h4 className="widget-title">Padrões de consumo</h4>

      <div className="compact-insights-list">
        {insights.map((insight) => {
          const Icon = insight.icon;

          return (
            <div key={insight.title} className="compact-insight-item">
              <Icon size={18} color={insight.isAlert ? '#F04438' : '#9E4A69'} />
              <div>
                <strong>{insight.title}</strong>
                <p>{insight.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
