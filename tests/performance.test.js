
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/App';

test('performance: adding multiple expenses within a set time', () => {
  render(<App />);
  
  const numExpenses = 100;
  const start = performance.now();
  
  for (let i = 0; i < numExpenses; i++) {
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'shopping' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: `Item ${i}` } });
    fireEvent.click(screen.getByText(/Add Expense/i));
  }
  
  const end = performance.now();
  const duration = end - start;
  console.log(`Adding ${numExpenses} expenses took ${duration} milliseconds`);
  
  // Expectation: should complete within a threshold (e.g., 3000ms)
  expect(duration).toBeLessThan(3000);
});
