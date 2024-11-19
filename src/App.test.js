import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation bar', () => {
  render(<App />);
  const navElement = screen.getByText(/CP Club/i);
  expect(navElement).toBeInTheDocument();
});
