import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingScreen from '../../../src/components/Screens/SettingScreen'; // Adjust the import based on your file structure

describe('SettingScreen', () => {
  beforeEach(() => {
    render(<SettingScreen />);
  });

  test('renders the main title', () => {
    const titleElement = screen.getAllByText(/Settings/i)[0];
    expect(titleElement).toBeInTheDocument();
  });

  test('renders account settings section', () => {
    const accountSettingsTitle = screen.getByText(/Account Settings/i);
    expect(accountSettingsTitle).toBeInTheDocument();

    const nameElement = screen.getByText(/Name: John Doe/i);
    const emailElement = screen.getByText(/Email: john.doe@example.com/i);
    const passwordElement = screen.getByText(/Password: \*\*\*\*\*\*/i);

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();

    const changeButtons = screen.getAllByText(/Change/i);
    expect(changeButtons.length).toBe(6); // Three Change buttons in Account Settings
  });

  test('renders preferences section', () => {
    const preferencesTitle = screen.getByText(/Preferences/i);
    expect(preferencesTitle).toBeInTheDocument();

    const languageElement = screen.getByText(/Language: English/i);
    const timeZoneElement = screen.getByText(/Time Zone: UTC-5/i);
    const notificationsElement = screen.getByText(/Notifications: On/i);

    expect(languageElement).toBeInTheDocument();
    expect(timeZoneElement).toBeInTheDocument();
    expect(notificationsElement).toBeInTheDocument();

    const changeButtons = screen.getAllByText(/Change/i);
    expect(changeButtons.length).toBe(6); // Three Change buttons in Preferences
  });

  test('handles Change button clicks', () => {
    const changeButtons = screen.getAllByText(/Change/i);
    changeButtons.forEach(button => {
      fireEvent.click(button);
      // You can add assertions here to check if the expected behavior occurs
      // For example, if you open a modal, check if the modal is in the document
      // For now, we will just check if the button is clickable without errors
      expect(button).toBeInTheDocument();
    });
  });
});