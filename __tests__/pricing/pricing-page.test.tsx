/**
 * Pricing Page Tests
 * TC-PRICE-001 through TC-PGEN-004
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pricing from '@/pages/Pricing';

describe('Pricing Page Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Pricing Display Tests', () => {
    describe('TC-PRICE-001: Verify pricing page loads correctly', () => {
      it('should render pricing page', () => {
        render(<Pricing />);
        expect(screen.getByText(/Simple pricing for/)).toBeInTheDocument();
      });
    });

    describe('TC-PRICE-002: Verify page title "Simple pricing for serious builders." is displayed', () => {
      it('should display title', () => {
        render(<Pricing />);
        expect(screen.getByText(/Simple pricing for/)).toBeInTheDocument();
        expect(screen.getByText(/serious builders/)).toBeInTheDocument();
      });
    });

    describe('TC-PRICE-003: Verify page subtitle is displayed', () => {
      it('should display subtitle', () => {
        render(<Pricing />);
        expect(screen.getByText(/Start for free/)).toBeInTheDocument();
      });
    });

    describe('TC-PRICE-004: Verify all 3 pricing plans are displayed', () => {
      it('should display all plans', () => {
        render(<Pricing />);
        expect(screen.getByText('Starter')).toBeInTheDocument();
        expect(screen.getByText('Pro')).toBeInTheDocument();
        expect(screen.getByText('Team')).toBeInTheDocument();
      });
    });

    describe('TC-PRICE-005: Verify each plan has correct price', () => {
      it('should display correct prices', () => {
        render(<Pricing />);
        expect(screen.getByText('$0')).toBeInTheDocument();
        expect(screen.getByText('$29')).toBeInTheDocument();
        expect(screen.getByText('$99')).toBeInTheDocument();
      });
    });

    describe('TC-PRICE-006: Verify each plan has description', () => {
      it('should display descriptions', () => {
        render(<Pricing />);
        expect(screen.getByText(/For solo builders/)).toBeInTheDocument();
        expect(screen.getByText(/For professional product managers/)).toBeInTheDocument();
        expect(screen.getByText(/For startups scaling/)).toBeInTheDocument();
      });
    });

    describe('TC-PRICE-007: Verify each plan has feature list', () => {
      it('should display features', () => {
        render(<Pricing />);
        expect(screen.getByText('5 Projects')).toBeInTheDocument();
        expect(screen.getByText('Unlimited Projects')).toBeInTheDocument();
        expect(screen.getByText('5 Team Members')).toBeInTheDocument();
      });
    });

    describe('TC-PRICE-008: Verify "Most Popular" badge appears on Pro plan', () => {
      it('should display most popular badge', () => {
        render(<Pricing />);
        expect(screen.getByText('Most Popular')).toBeInTheDocument();
      });
    });
  });

  describe('Billing Toggle Tests', () => {
    describe('TC-BILL-001: Verify billing toggle (Monthly/Yearly) is visible', () => {
      it('should display toggle', () => {
        render(<Pricing />);
        expect(screen.getByText('Monthly')).toBeInTheDocument();
        expect(screen.getByText('Yearly')).toBeInTheDocument();
      });
    });

    describe('TC-BILL-002: Verify toggle defaults to "Yearly" (annual = true)', () => {
      it('should default to yearly', () => {
        render(<Pricing />);
        const toggle = screen.getByRole('switch');
        expect(toggle).toHaveAttribute('aria-checked', 'true');
      });
    });

    describe('TC-BILL-003: Verify clicking toggle switches between Monthly and Yearly', () => {
      it('should toggle between monthly and yearly', async () => {
        const user = userEvent.setup();
        render(<Pricing />);
        
        const toggle = screen.getByRole('switch');
        expect(toggle).toHaveAttribute('aria-checked', 'true');
        
        await user.click(toggle);
        expect(toggle).toHaveAttribute('aria-checked', 'false');
        
        await user.click(toggle);
        expect(toggle).toHaveAttribute('aria-checked', 'true');
      });
    });

    describe('TC-BILL-004: Verify "-20% discount" text is visible when Yearly is selected', () => {
      it('should display discount text', () => {
        render(<Pricing />);
        expect(screen.getByText(/-20%/)).toBeInTheDocument();
      });
    });

    describe('TC-BILL-006: Verify toggle is keyboard accessible', () => {
      it('should be keyboard accessible', () => {
        render(<Pricing />);
        const toggle = screen.getByRole('switch');
        toggle.focus();
        expect(toggle).toHaveFocus();
      });
    });

    describe('TC-BILL-007: Verify toggle has proper ARIA attributes', () => {
      it('should have ARIA attributes', () => {
        render(<Pricing />);
        const toggle = screen.getByRole('switch');
        expect(toggle).toHaveAttribute('role', 'switch');
        expect(toggle).toHaveAttribute('aria-checked');
        expect(toggle).toHaveAttribute('aria-label');
      });
    });
  });

  describe('Pricing Buttons Tests', () => {
    describe('TC-PBTN-001: Verify "Start Building" button is on Starter plan', () => {
      it('should have Start Building button', () => {
        render(<Pricing />);
        expect(screen.getByText('Start Building')).toBeInTheDocument();
      });
    });

    describe('TC-PBTN-002: Verify "Get Started" button is on Pro and Team plans', () => {
      it('should have Get Started buttons', () => {
        render(<Pricing />);
        const buttons = screen.getAllByText('Get Started');
        expect(buttons).toHaveLength(2);
      });
    });

    describe('TC-PBTN-003: Verify buttons have hover effects', () => {
      it('should have hover classes', () => {
        render(<Pricing />);
        const starterButton = screen.getByText('Start Building');
        // Starter button has hover:bg-neutral-700 (it's bg-neutral-800)
        expect(starterButton).toHaveClass('hover:bg-neutral-700');
        
        // Pro/Team buttons have hover:bg-neutral-200 (they're white)
        const proButton = screen.getAllByText('Get Started')[0];
        expect(proButton).toHaveClass('hover:bg-neutral-200');
      });
    });

    describe('TC-PBTN-004: Verify buttons have focus states', () => {
      it('should have focus classes', () => {
        render(<Pricing />);
        const button = screen.getByText('Start Building');
        expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
      });
    });

    describe('TC-PBTN-005: Verify buttons are keyboard accessible', () => {
      it('should be keyboard accessible', () => {
        render(<Pricing />);
        const button = screen.getByText('Start Building');
        button.focus();
        expect(button).toHaveFocus();
      });
    });
  });
});

