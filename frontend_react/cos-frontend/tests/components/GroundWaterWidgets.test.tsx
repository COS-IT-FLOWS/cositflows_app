// GWLWidgets.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import GWLWidgets from "../../src/components/AnalyticsWidgets/GroundWaterWidgets";
import { ThemeProvider } from '@mui/material';
import theme from '../../src/components/theme';

describe("GWLWidgets", () => {
  test("renders without crashing", () => {
    render(
      <ThemeProvider theme={theme}>
        <GWLWidgets />
      </ThemeProvider>
    );
    expect(screen.getByText("Vertical Map")).toBeInTheDocument();
    expect(screen.getByText("Legend")).toBeInTheDocument();
    expect(screen.getByText("GWL Station")).toBeInTheDocument();
    expect(screen.getByText("Groundwater Level Station Data")).toBeInTheDocument();
    expect(screen.getByText("Monthly Trends")).toBeInTheDocument();
    expect(screen.getByText("Basin Details")).toBeInTheDocument();
  });

  // Additional tests can be added here
});