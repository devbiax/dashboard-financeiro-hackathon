export interface Transaction {
  id: number;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

export const transactions = [

  {
    id: 1,
    category: 'Salário',
    type: 'income',
    amount: 8800,
  },

  {
    id: 2,
    category: 'Delivery',
    type: 'expense',
    amount: 163,
  },

  {
    id: 3,
    category: 'Transporte',
    type: 'expense',
    amount: 450,
  },

  {
    id: 4,
    category: 'Streaming',
    type: 'expense',
    amount: 89,
  },

  {
    id: 5,
    category: 'Freelance',
    type: 'income',
    amount: 1200,
  },

]