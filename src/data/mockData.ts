import transactionsJson from './transactions.json';

export interface Transaction {
  id: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
}

export const dataSource = {
  type: 'JSON local',
  file: 'src/data/transactions.json',
  description:
    'Base simulada para um dashboard financeiro pessoal, criada com receitas, despesas, categorias e datas para demonstrar o fluxo de dados do hackathon.',
};

export const transactions = transactionsJson as Transaction[];
