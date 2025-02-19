// ForecastScreen.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ForecastScreen from '../../../src/components/Screens/ForecastTutorial'; // Adjust the import based on your file structure
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import theme from '../../../src/components/theme'; // Adjust the import based on your file structure

describe('ForecastScreen', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ForecastScreen />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to Forecast/i)).toBeInTheDocument(); // Check if the welcome text is rendered
  });

  it('displays the correct instructions', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ForecastScreen />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Input a predicted rainfall value for tomorrow/i)).toBeInTheDocument(); // Check for instructions
  });

  it('renders the Begin button', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ForecastScreen />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /Begin/i })).toBeInTheDocument(); // Check if the Begin button is rendered
  });
});