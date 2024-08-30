import { render, screen } from '@testing-library/react';
import MyComponent from '../MonitorScreen';

test('renders learn react link', () => {
  render(<MyComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
