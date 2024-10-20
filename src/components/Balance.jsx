import React, { useContext } from 'react';
import { GlobalContext } from '../context/AppContext';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  // Calculate total income and expenses
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => (acc += t.amount), 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => (acc += Math.abs(t.amount)), 0);

  const balance = (income - expense);

  return (
    <div className=" sm:w-[1240px] h-[125px] mt-[20px] mx-[10px] sm:mt-[37px] sm:mr-[40px] sm:ml-[135px] pt-[37px] pr-[20px] pb-[37px] pl-[20px] rounded-xl bg-[rgba(69,90,100,1)] flex flex-col justify-center mb-6 p-5">
      <h3 className="text-sm text-white text-left pl-1">Available balance</h3>
      <h2 className="text-4xl font-bold text-white text-left pt-3">
        ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h2>
    </div>
  );
};

export default Balance;
