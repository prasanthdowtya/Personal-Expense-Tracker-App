
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/App';

test('renders the app and allows adding and deleting expenses', () => {
  render(<App />);

  // Check if form elements are present
  expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();

  // Adding a new expense
  fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '100' } });
  fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'transport' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Taxi' } });
  fireEvent.click(screen.getByText(/Add Expense/i));

  // Verifying the new expense appears in the list
  expect(screen.getByText(/Taxi/i)).toBeInTheDocument();
  expect(screen.getByText('$100')).toBeInTheDocument();
});
