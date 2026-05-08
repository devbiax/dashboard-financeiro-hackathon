import type { Transaction } from '../data/mockData';
import { parseFinancialDate } from './dateUtils';

export interface FinanceSummary {
  income: number;
  expenses: number;
  balance: number;
  savingsRate: number;
  averageExpense: number;
  weeklyVariation: number;
  topExpenseCategory: string;
  frequentExpenseCategory: string;
  aboveAverageCount: number;
}

export interface CategoryBreakdown {
  name: string;
  amount: number;
  budgetPct: number;
  incomePct: number;
}

export interface ChartPoint {
  name: string;
  entrada: number;
  saida: number;
}

const expenseCategories = ['Necessidades', 'Desejos', 'Investimentos'];

const daysBetween = (current: Date, previous: Date) => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((current.getTime() - previous.getTime()) / millisecondsPerDay);
};

export const getCategoryBreakdown = (transactions: Transaction[]): CategoryBreakdown[] => {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return expenseCategories.map((category) => {
    const amount = transactions
      .filter((transaction) => transaction.type === 'expense' && transaction.category === category)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return {
      name: category,
      amount,
      budgetPct: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      incomePct: totalIncome > 0 ? (amount / totalIncome) * 100 : 0,
    };
  });
};

export const getFinanceSummary = (transactions: Transaction[]): FinanceSummary => {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenseTransactions = transactions.filter((transaction) => transaction.type === 'expense');
  const expenses = expenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const balance = income - expenses;
  const averageExpense = expenseTransactions.length > 0 ? expenses / expenseTransactions.length : 0;

  const referenceDate = transactions.reduce((latest, transaction) => {
    const transactionDate = parseFinancialDate(transaction.date);
    return transactionDate > latest ? transactionDate : latest;
  }, new Date(0));

  const lastSevenDays = expenseTransactions
    .filter((transaction) => {
      const diff = daysBetween(referenceDate, parseFinancialDate(transaction.date));
      return diff >= 0 && diff <= 6;
    })
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const previousSevenDays = expenseTransactions
    .filter((transaction) => {
      const diff = daysBetween(referenceDate, parseFinancialDate(transaction.date));
      return diff >= 7 && diff <= 13;
    })
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const categories = getCategoryBreakdown(transactions);
  const topExpenseCategory = categories.reduce(
    (top, category) => (category.amount > top.amount ? category : top),
    { name: 'Sem gastos', amount: 0, budgetPct: 0, incomePct: 0 },
  ).name;

  const frequency = expenseTransactions.reduce<Record<string, number>>((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + 1;
    return acc;
  }, {});

  const frequentExpenseCategory =
    Object.entries(frequency).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Sem padrao detectado';

  return {
    income,
    expenses,
    balance,
    savingsRate: income > 0 ? (balance / income) * 100 : 0,
    averageExpense,
    weeklyVariation: previousSevenDays > 0 ? ((lastSevenDays - previousSevenDays) / previousSevenDays) * 100 : 0,
    topExpenseCategory,
    frequentExpenseCategory,
    aboveAverageCount: expenseTransactions.filter((transaction) => transaction.amount > averageExpense).length,
  };
};

export const getLastSevenDaysChartData = (transactions: Transaction[]): ChartPoint[] => {
  const referenceDate =
    transactions.length > 0
      ? transactions.reduce((latest, transaction) => {
          const transactionDate = parseFinancialDate(transaction.date);
          return transactionDate > latest ? transactionDate : latest;
        }, new Date(0))
      : new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(referenceDate);
    date.setDate(referenceDate.getDate() - (6 - index));

    const dayTransactions = transactions.filter((transaction) => {
      const transactionDate = parseFinancialDate(transaction.date);
      return (
        transactionDate.getFullYear() === date.getFullYear() &&
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getDate() === date.getDate()
      );
    });

    const entrada = dayTransactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const saida = dayTransactions
      .filter((transaction) => {
        return transaction.type === 'expense';
      })
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return {
      name: date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
      entrada,
      saida,
    };
  });
};
