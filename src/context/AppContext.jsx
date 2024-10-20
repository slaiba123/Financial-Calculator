import React, { createContext, useState, useEffect } from 'react';

// Create context
export const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Action to add a transaction
  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [transaction, ...prevTransactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter(transaction => transaction.id !== id)
    );
  };

  return (
    <GlobalContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
