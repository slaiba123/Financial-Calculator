
import React, { useContext } from 'react';
import { GlobalContext } from '../context/AppContext';

const IncomeExpense = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0);

  const expense = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => (acc += Math.abs(transaction.amount)), 0);

  return (
    <div className="flex max-sm:mx-3">
      {/* Income Section */}
      <div 
        className="w-[50vw]   h-[130px] mb-[24px] sm:w-[610px] sm:ml-[135px] pt-[24px] pr-[24px] pb-[24px] pl-[24px] rounded-[8px] bg-[rgba(217,231,229,1)] sm:mx-0"
      > 
        <img 
          src="../icons/income.png" 
          alt="Income Icon" 
          className="w-8 h-8 mb-2" 
        />
        <p className="text-2xl font-bold text-[#030303] plus">
          ${income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <h4 className="text-sm text-[#686868]">Income</h4>
      </div>
      
      {/* Expense Section */}
      <div 
        className="w-[50vw] ml-2 h-[130px] mb-[24px] sm:w-[610px] sm:ml-[20px] sm:mr-[135px] pt-[24px] pr-[20px] pb-[24px] pl-[24px] rounded-[8px] bg-[#E6E2E6] sm:mx-0 p-4"
      >
        <img 
          src="../icons/exp.png" 
          alt="Expense Icon" 
          className="w-8 h-8 mb-2" 
        />
        <p className="text-2xl font-bold text-[#030303] minus">
          ${expense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <h4 className="text-sm text-[#686868]">Expense</h4>
      </div>
    </div>
  );
};

export default IncomeExpense;

