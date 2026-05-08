import React from "react";
import { Trash2 } from "lucide-react";
import type { Transaction } from "../../data/mockData";
import { formatFinancialDate, parseFinancialDate } from "../../utils/dateUtils";

interface TransactionsListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  onDeleteTransaction,
}) => {
  const sortedTransactions = [...transactions]
    .sort((current, previous) => {
      return (
        parseFinancialDate(previous.date).getTime() -
        parseFinancialDate(current.date).getTime()
      );
    })
    .slice(0, 10);

  return (
    <div className="transactions-container">
      <h3 className="transactions-title">Transações mais recentes</h3>

      <div className="transactions-table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td data-label="Data">
                    {formatFinancialDate(transaction.date)}
                  </td>
                  <td data-label="Descrição">
                    {transaction.description || "--"}
                  </td>
                  <td
                    data-label="Valor"
                    className={`amount ${transaction.type}`}
                  >
                    {transaction.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td data-label="Categoria">
                    <span className="tag-category">{transaction.category}</span>
                  </td>
                  <td data-label="Ações">
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="btn-delete"
                      title="Excluir"
                      aria-label="Excluir transação"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan={5}>Nenhuma transação encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
