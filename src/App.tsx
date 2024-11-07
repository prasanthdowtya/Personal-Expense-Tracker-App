import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import ExpenseSummary from './components/ExpenseSummary';
import type { Expense, Category, MonthlyTotal } from './types/expense';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      return JSON.parse(saved).map((expense: any) => ({
        ...expense,
        date: new Date(expense.date),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = ({ amount, category, description }: {
    amount: number;
    category: Category;
    description: string;
  }) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount,
      category,
      description,
      date: new Date(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const getMonthlyData = (): MonthlyTotal[] => {
    const monthlyTotals: { [key: string]: number } = {};
    
    expenses.forEach((expense) => {
      const month = format(expense.date, 'MMM yyyy');
      monthlyTotals[month] = (monthlyTotals[month] || 0) + expense.amount;
    });

    return Object.entries(monthlyTotals).map(([month, total]) => ({
      month,
      total,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Personal Expense Tracker</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ExpenseSummary expenses={expenses} />
            <ExpenseChart data={getMonthlyData()} />
            <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          </div>

          <div>
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;