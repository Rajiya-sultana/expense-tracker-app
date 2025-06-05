import { useCallback, useState } from "react";
import transactionsData from "../data/transaction";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState(transactionsData);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const calculateSummary = useCallback((transactionsList) => {
    let income = 0;
    let expenses = 0;

    transactionsList.forEach((transaction) => {
      if (transaction.amount >= 0) {
        income += transaction.amount;
      } else {
        expenses += Math.abs(transaction.amount);
      }
    });

    const balance = income - expenses;
    setSummary({ balance, income, expenses });
  }, []);

  const loadData = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setTransactions(transactionsData);
      calculateSummary(transactionsData);
      setIsLoading(false);
    }, 1000);
  }, [calculateSummary]);

  const deleteTransaction = (id) => {
    const filtered = transactions.filter((item) => item.id !== id);
    setTransactions(filtered);
    calculateSummary(filtered);
  };

  return { transactions, summary, isLoading, loadData, deleteTransaction };
};
