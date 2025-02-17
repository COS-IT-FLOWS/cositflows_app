import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'; // For routing context
import MenuList from '../../../src/components/Menu/MenuList'; // Adjust the import path as necessary

describe('MenuList Component', () => {
    const setActiveViewMock = jest.fn();


    beforeEach(() => {
        

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={
                        <MenuList activeControl="monitor" activeView="visualization" setActiveView={setActiveViewMock} />
                    }
                    />
                    <Route path='/monitor-visualization' element={
                        <MenuList activeControl="monitor" activeView="visualization" setActiveView={setActiveViewMock} />
                    }
                    />
                    <Route path='/monitor-analytics' element={
                        <MenuList activeControl="monitor" activeView="analytics" setActiveView={setActiveViewMock} />
                    } />
                </Routes>
            </MemoryRouter>
        );
    });

    test('renders all menu items', () => {
        const menuItems = ['Visualization', 'Analytics', 'About', 'Settings'];
        menuItems.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    test('navigates to the correct route when clicked', () => {

        // Find the analytics link

        const analyticsLink = screen.getByText('Analytics').closest('a');

        if (analyticsLink) {

            fireEvent.click(analyticsLink);
            const location = useLocation();
            
            expect(location).toBe('/monitor-analytics');

        } else {

            throw new Error('Analytics link not found');

        }

    });


    // test('navigates to the correct link when clicked', () => {
    //     const analyticsLink = screen.getByText('Analytics').closest('a');
    //     if (analyticsLink) {
    //         console.log(window.location.pathname);
    //         fireEvent.click(analyticsLink);
    //         expect(window.location.pathname).toBe('/monitor-analytics');
    //         // Add your assertions here
    //     } else {
    //         throw new Error('Analytics link not found');
    //     }
    // });

    test('calls setActiveView with correct view on link click', () => {
        const visualizationLink = screen.getByText('Visualization').closest('a');
        if (visualizationLink) {
            fireEvent.click(visualizationLink);
            expect(window.location.pathname).toBe('/visualization'); // Adjust based on your routing logic
        } else {
            throw new Error('Visualization link not found');
        }
    });

    test('highlights the active view correctly', () => {
        const activeIcon = screen.getByText('Visualization').previousElementSibling?.children[0];
        expect(activeIcon).toHaveClass('bg-teal-100'); // Adjust based on your active class logic
    });
});

function createMemoryHistory(arg0: { initialEntries: string[]; }) {
    throw new Error('Function not implemented.');
}
