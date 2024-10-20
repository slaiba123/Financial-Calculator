import React, { useContext } from 'react';
import { GlobalContext } from '../context/AppContext';

// Function to dynamically get the current month name
const getCurrentMonth = () => {
  const date = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[date.getMonth()]; // Get the current month as a string
};

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);

  const currentMonth = getCurrentMonth(); // Get the current month dynamically

  return (
  <div>
    <div className="p-6 bg-[#F9F9F9] rounded-lg w-full h-auto border-t border-transparent ">
      <h6 className="text-xl font-bold mb-4 text-[#030303]">Transaction History</h6>
      <ul className="list-none">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`flex p-6 pt-2 mb-4 rounded-md bg-white shadow-md flex-col`}
          >
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg text-[#838383]">{transaction.category}</h4>
              <div className="flex items-center">
                <span
                  className={`px-3 rounded-full font-bold text-sm ${
                    transaction.amount < 0
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {transaction.amount < 0 ? 'Expense' : 'Income'}
                </span>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className=" bg-transparent text-red-500 hover:text-red-700"
                >
                  <img src="/icons/bin.png" alt="Delete Icon"/>
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 pb-2">
               ${new Intl.NumberFormat().format(Math.abs(transaction.amount))}
              </span>
              {/* Dynamically displaying transaction description and month */}
              <p className="text-[#4F4F4F]">
                {transaction.category} for the month of {currentMonth}.
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TransactionList;

