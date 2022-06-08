import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('Погода', () => {
  render(<App />)
  const weather = screen.getByText(/Погода/i);
  expect(weather).toBeInTheDocument();
})