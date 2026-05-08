import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Transaction } from '../../data/mockData';
import { formatFinancialDate, getTodayInputDate } from '../../utils/dateUtils';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getTodayInputDate());
  const [category, setCategory] = useState('Necessidades');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!description || !amount || !date) return;

    const newTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: formatFinancialDate(date),
    };

    onAddTransaction(newTransaction);
    setDescription('');
    setAmount('');
    setDate(getTodayInputDate());
  };

  return (
    <form onSubmit={handleSubmit} className="form-diva">
      <h3 className="form-title">
        <PlusCircle size={22} /> Nova transação
      </h3>

      <div className="form-row">
        <input
          type="text"
          placeholder="Descrição"
          className="form-input"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor (R$)"
          className="form-input"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <input
          type="date"
          className="form-input"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          aria-label="Data da transação"
        />

        <select className="form-select" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="Necessidades">Essenciais</option>
          <option value="Desejos">Estilo de vida</option>
          <option value="Investimentos">Investimentos</option>
          <option value="Receita">Entrada/Salário</option>
        </select>

        <button type="submit" className="form-button">
          Adicionar
        </button>
      </div>

      <div className="form-radios">
        <label className="radio-label is-income">
          <input
            type="radio"
            checked={type === 'income'}
            onChange={() => {
              setType('income');
              setCategory('Receita');
            }}
          />
          Receita
        </label>
        <label className="radio-label is-expense">
          <input
            type="radio"
            checked={type === 'expense'}
            onChange={() => {
              setType('expense');
              setCategory('Necessidades');
            }}
          />
          Despesa
        </label>
      </div>
    </form>
  );
}
