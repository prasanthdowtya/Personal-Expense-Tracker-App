
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseForm from '../../src/components/ExpenseForm';
import ExpenseList from '../../src/components/ExpenseList';

// Unit test for adding an expense
test('adds an expense successfully', () => {
  const addExpenseMock = jest.fn();
  render(<ExpenseForm onAddExpense={addExpenseMock} />);
  
  fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'food' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Lunch' } });
  fireEvent.click(screen.getByText(/Add Expense/i));

  expect(addExpenseMock).toHaveBeenCalledWith({
    amount: 50,
    category: 'food',
    description: 'Lunch'
  });
});

// Unit test for deleting an expense
test('deletes an expense from the list', () => {
  const deleteExpenseMock = jest.fn();
  const expenses = [{ id: '1', amount: 50, category: 'food', description: 'Lunch', date: new Date() }];
  
  render(<ExpenseList expenses={expenses} onDeleteExpense={deleteExpenseMock} />);
  fireEvent.click(screen.getByRole('button', { name: /delete/i }));

  expect(deleteExpenseMock).toHaveBeenCalledWith('1');
});
