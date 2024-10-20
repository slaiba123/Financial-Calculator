import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/AppContext';

const AddTransaction = () => {
  const [description, setDescription] = useState(''); // Description for the transaction
  const [amount, setAmount] = useState(''); // Amount for the transaction
  const [category, setCategory] = useState(''); // Category selected
  const [clickedButton, setClickedButton] = useState(null); // Track which button was clicked
  const { addTransaction } = useContext(GlobalContext); // Context to add transaction

  // Function to handle form submission
  const onSubmit = e => {
    e.preventDefault(); // Prevent page refresh on form submission

    if (!clickedButton) {
      alert('Please select either Income or Expense');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000), // Generate a unique ID
      description,
      category,
      amount: clickedButton === 'Expense' ? -Math.abs(amount) : +Math.abs(amount), // Negative for Expense
      type: clickedButton, // Set type based on button clicked
    };

    addTransaction(newTransaction);

    // Clear form fields after submission
    setDescription(''); // Reset description
    setAmount(''); // Reset amount to show placeholder
    setCategory(''); // Reset category
    setClickedButton(null); // Reset clicked button
  };

  // Function to handle button click
  const handleClick = (type) => {
    setClickedButton(type); // Set clickedButton to 'Income' or 'Expense'
  };

  return (
    <div className='mx-3'>
      <div className='pb-[30px]'>
        <h4 className="text-2xl font-bold text-gray-800">Add Transaction</h4>
      </div>
      <p className='ml-[7px]'>Select Type</p>
      <div className='flex mt-4 mb-3 ml-[5px]'>
        <button 
          onClick={() => handleClick('Income')}
          className={`w-[170px] h-[80px] 
            bg-[rgba(217,231,229,1)] 
            text-${clickedButton === 'Income' ? '[#000] font-bold' : '[#767676]'} 
            border-2
            ${clickedButton === 'Income' ? 'border-[#42887C]' : 'border-transparent'} 
            rounded-lg 
            transition duration-300`}
        >
          Income
        </button>

        <button 
          onClick={() => handleClick('Expense')}
          className={`w-[170px] h-[80px] 
          bg-[#E6E2E6]
            ml-[20px]
            text-${clickedButton === 'Expense' ? '[#000] font-bold' : '[#767676]'} 
            border-2
            ${clickedButton === 'Expense' ? 'border-gray-700' : 'border-transparent'} 
            rounded-lg 
            transition duration-300`}
        >
          Expense
        </button>
      </div>

      <form onSubmit={onSubmit} className='ml-[5px]'>
        <label>Category</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          {clickedButton === 'Income' && (
            <>
              <option value="Salary">Salary</option>
              <option value="Rental Income">Rental Income</option>
              <option value="Business">Business</option>
              <option value="Stocks">Stocks</option>
            </>
          )}
          {clickedButton === 'Expense' && (
            <>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Grocery">Grocery</option>
            </>
          )}
        </select>
    
        <label>Amount</label>
        <input 
          type="number" 
          placeholder="$$$"  
          value={amount} // Controlled input
          onChange={(e) => setAmount(e.target.value)} 
          className="mt-2 p-2 border border-gray-300 rounded-md"
        />

        <label>Description</label>
        <textarea
          value={description}
          placeholder="Enter a Description"
          onChange={(e) => setDescription(e.target.value)}
          style={{ 
            height: '150px', 
            padding: '10px',
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            resize: 'none' 
          }}
          className="text-left mt-2"
        />

        <button type="submit" className="mt-4 p-2 bg-[rgba(255, 199, 39, 1)] text-white rounded-md">
          Add Transaction
        </button>
      </form>
    </div>
  ); 
};

export default AddTransaction;
