import React, { useState } from 'react';
import { GlobalProvider } from './context/AppContext';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import PieChart from './components/PieChart';

const App = () => {
  // State to manage AddTransaction and PieChart visibility
  const [isAddTransactionVisible, setIsAddTransactionVisible] = useState(false);
  const [isPieChartVisible, setIsPieChartVisible] = useState(false);

  // Function to toggle AddTransaction visibility
  const toggleAddTransaction = () => {
    setIsAddTransactionVisible((prev) => !prev);
  };

  // Function to toggle PieChart visibility
  const togglePieChart = () => {
    setIsPieChartVisible((prev) => !prev);
  };

  return (
    <GlobalProvider>
      <div className="container overflow-x-hidden ">
        <Balance />
        <IncomeExpense />
        <div className="flex ml-[135px] gap-[10px] w-[1240px] pb-[20px] max-sm:ml-[10px] flex-col sm:flex-row">
          <div className="flex flex-col w-[380px] gap-[15px] p-5 pt-0 rounded-lg shadow-md h-[680px] sm:block hidden">
            <AddTransaction />
          </div>
          <div className="bg-[#F9F9F9] rounded-lg shadow-md min-h-[200px] max-h-[680px] overflow-y-auto max-w-[640px] max-sm:w-screen">
            <TransactionList />
          </div>
          <div className="w-[500px] ml-[10px]  bg-[#F9F9F9] p-[20px] rounded-lg shadow-md h-[680px] sm:block hidden">
            <PieChart />
          </div>
        </div>

        {/* Buttons visible only on screens <= 640px */}
        <div className="flex justify-center gap-4 mt-4 sm:hidden">
          <button 
            className="bg-[rgba(255, 199, 39, 1)] text-white px-4 py-2 rounded w-1/2 ml-3"
            onClick={toggleAddTransaction} // Toggle visibility on button click
          >
            Add Transaction
          </button>
          <button 
            className="bg-[rgba(255, 199, 39, 1)] text-white px-4 py-2 rounded w-1/2 "
            onClick={togglePieChart} // Toggle visibility on button click
          >
            Financial Summary
          </button>
        </div>

        {/* Conditional rendering of AddTransaction for full-screen */}
        {isAddTransactionVisible && (
          <div className="fixed inset-0 bg-[#F9F9F9] flex flex-col  max-sm:w-screen"> {/* Full-screen style */}
          
            <AddTransaction />
            <button 
              className=" bg-red-500 text-white px-4 py-1 rounded mx-4 mt-1 h-7 inset-0"
              onClick={toggleAddTransaction} // Hide on button click
            >
              🔙BACK
            </button>
          </div>
        )}

        {/* Conditional rendering of PieChart for full-screen */}
        {isPieChartVisible && (
          <div className="fixed inset-0 z-50 flex flex-col p-5 max-sm:w-screen  bg-[#F9F9F9]"> {/* Full-screen style */}
            <PieChart />
            <button 
              className="mt-11 bg-red-500 text-white px-4 py-2 rounded"
              onClick={togglePieChart} // Hide on button click
            >
              Close
            </button>
          </div>
        )}
      </div>
    </GlobalProvider>
  );
};

export default App;
