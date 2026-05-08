import React from 'react';
import { AlertTriangle, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import type { Transaction } from '../../data/mockData';
import { getCategoryBreakdown, getFinanceSummary } from '../../utils/financeAnalytics';

interface InsightsGridProps {
  transactions: Transaction[];
}

const InsightsGrid: React.FC<InsightsGridProps> = ({ transactions }) => {
  const summary = getFinanceSummary(transactions);
  const categories = getCategoryBreakdown(transactions);
  const needsPct = categories.find((category) => category.name === 'Necessidades')?.incomePct || 0;
  const wantsPct = categories.find((category) => category.name === 'Desejos')?.incomePct || 0;
  const savingsPct = categories.find((category) => category.name === 'Investimentos')?.incomePct || 0;
  const hasBudgetAlert = needsPct > 50 || wantsPct > 30 || savingsPct < 20;

  return (
    <div className="insights-wrapper">
      <div className="insights-container">
        <div className="insight-card">
          <ShieldCheck size={20} color={needsPct > 50 ? '#F04438' : '#9E4A69'} />
          <div>
            <h4>Necessidades (50%)</h4>
            <p>
              Você está usando <strong>{needsPct.toFixed(0)}%</strong> da renda.
            </p>
          </div>
        </div>

        <div className="insight-card">
          <Zap size={20} color={wantsPct > 30 ? '#F04438' : '#9E4A69'} />
          <div>
            <h4>Desejos (30%)</h4>
            <p>
              Essa categoria ocupa <strong>{wantsPct.toFixed(0)}%</strong> do orçamento.
            </p>
          </div>
        </div>

        <div className="insight-card">
          <TrendingUp size={20} color={savingsPct < 20 ? '#F04438' : '#9E4A69'} />
          <div>
            <h4>Investimentos (20%)</h4>
            <p>
              Meta: 20%. Atual: <strong>{savingsPct.toFixed(0)}%</strong>.
            </p>
          </div>
        </div>
      </div>

      {hasBudgetAlert && (
        <div className="alert-banner insight-alert">
          <p>
            <AlertTriangle size={18} />
            <strong>Atenção:</strong> a regra 50-30-20 indica ajuste no orçamento. Maior peso atual:{' '}
            {summary.topExpenseCategory}.
          </p>
        </div>
      )}
    </div>
  );
};

export default InsightsGrid;
