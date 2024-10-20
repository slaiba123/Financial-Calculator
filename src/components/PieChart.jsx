import React, { useContext, useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, DoughnutController } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { GlobalContext } from '../context/AppContext';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title, DoughnutController, ChartDataLabels);

const FinancialSummary = () => {
  const { transactions } = useContext(GlobalContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);
  const incomeChartInstance = useRef(null); // Store Chart.js instance
  const expenseChartInstance = useRef(null); // Store Chart.js instance
  const incomeCanvasRef = useRef(null); // Store canvas reference
  const expenseCanvasRef = useRef(null); // Store canvas reference

  // Update the screen size state when the window is resized
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate percentages for categories
  const calculateCategoryPercentages = (type, categories) => {
    const filteredTransactions = transactions.filter(transaction => transaction.type === type);
    const totalAmount = filteredTransactions.reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);
    const categoryTotals = categories.map(category => 
      filteredTransactions.filter(transaction => transaction.category === category)
        .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0)
    );
    
    return categoryTotals.map(total => (totalAmount > 0 ? ((total / totalAmount) * 100).toFixed(2) : 0));
  };

  const incomeCategories = ['Salary', 'Rental Income', 'Business', 'Stocks'];
  const incomePercentages = calculateCategoryPercentages('Income', incomeCategories);

  const expenseCategories = ['Shopping', 'Food', 'Entertainment', 'Grocery'];
  const expensePercentages = calculateCategoryPercentages('Expense', expenseCategories);

  const incomeData = {
    labels: incomeCategories,
    datasets: [{
      label: 'Income',
      data: incomePercentages,
      backgroundColor: ['#04BFDA', '#9B88ED', '#FB67CA', '#FFA84A'],
      borderWidth: 0,
    }],
  };

  const expenseData = {
    labels: expenseCategories,
    datasets: [{
      label: 'Expenses',
      data: expensePercentages,
      backgroundColor: ['#04BFDA', '#9B88ED', '#FB67CA', '#FFA84A'],
      borderWidth: 0,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        color: '#fff',
        anchor: 'center',
        align: 'center',
        formatter: (value) => (value > 0 ? `${Math.round(value)}%` : ''),
      },
    },
    cutout: '70%',
  };

  const createOrUpdateChart = (canvasRef, chartInstanceRef, chartData) => {
    // If there's an existing chart instance, destroy it
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new Chart.js instance
    if (canvasRef.current) {
      chartInstanceRef.current = new ChartJS(canvasRef.current, {
        type: 'doughnut',
        data: chartData,
        options: options,
      });
    }
  };

  useEffect(() => {
    // Create or update income and expense charts
    createOrUpdateChart(incomeCanvasRef, incomeChartInstance, incomeData);
    createOrUpdateChart(expenseCanvasRef, expenseChartInstance, expenseData);

    // Clean up charts on component unmount
    return () => {
      if (incomeChartInstance.current) incomeChartInstance.current.destroy();
      if (expenseChartInstance.current) expenseChartInstance.current.destroy();
    };
  }, [transactions, isSmallScreen]);

  return (
    <div className="flex flex-col space-y-8 w-full bg-[#F9F9F9]">
      <h2 className="font-bold text-2xl">Financial Summary</h2>

      {/* Income Section */}
      <div className="flex justify-between items-center pb-8">
        <div className={isSmallScreen ? 'w-48 h-48' : 'w-56 h-56'}>
          <h2 className="font-bold text-lg">Income</h2>
          <canvas ref={incomeCanvasRef} id="incomeChart" />
        </div>
        <div className="pt-8 pl-2">
          <ul className="list-none p-0 text-left">
            {incomeCategories.map((label, index) => (
              <li key={index} className="mb-2 text-sm  text-[#848A9C]">
                <span
                  className="inline-block w-4 h-4 border-2 rounded-full bg-transparent mr-2 text-[#848A9C]"
                  style={{ borderColor: incomeData.datasets[0].backgroundColor[index] }}
                ></span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Expense Section */}
      <div className="flex justify-between items-center">
        <div className={isSmallScreen ? 'w-48 h-48' : 'w-56 h-56'}>
          <h2 className="font-bold text-lg">Expense</h2>
          <canvas ref={expenseCanvasRef} id="expenseChart" />
        </div>
        <div className="pt-8 pl-2">
          <ul className="list-none p-0 text-left">
            {expenseCategories.map((label, index) => (
              <li key={index} className="mb-2 text-sm  text-[#848A9C]">
                <span
                  className="inline-block w-4 h-4 border-2 rounded-full bg-transparent mr-2"
                  style={{ borderColor: expenseData.datasets[0].backgroundColor[index] }}
                ></span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
