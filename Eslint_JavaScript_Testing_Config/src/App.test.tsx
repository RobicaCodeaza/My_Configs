import { render, screen } from '@testing-library/react';
import App from './App';

// import { test, expect } from 'vitest';

test('renders the app', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
