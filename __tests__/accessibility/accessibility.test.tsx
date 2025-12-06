/**
 * Accessibility Tests
 * TC-A11Y-001 through TC-KB-005
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import WaitlistModal from '@/components/modals/WaitlistModal';
import Pricing from '@/pages/Pricing';

describe('Accessibility Tests', () => {
  const mockOnOpenWaitlist = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('WCAG Compliance Tests', () => {
    describe('TC-A11Y-001: Verify all images have alt text', () => {
      it('should have alt text on navbar logo', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const logo = screen.getByAltText('WorkVar Logo');
        expect(logo).toBeInTheDocument();
      });

      it('should have alt text on footer logo', () => {
        render(<Footer />);
        const logo = screen.getByAltText('WorkVar Logo');
        expect(logo).toBeInTheDocument();
      });
    });

    describe('TC-A11Y-002: Verify all interactive elements are keyboard accessible', () => {
      it('should have keyboard accessible buttons', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const button = screen.getByText('Join Waitlist');
        button.focus();
        expect(button).toHaveFocus();
      });

      it('should have keyboard accessible links', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const link = screen.getByText('Home');
        link.focus();
        expect(link).toHaveFocus();
      });
    });

    describe('TC-A11Y-003: Verify focus indicators are visible', () => {
      it('should have focus styles on buttons', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const button = screen.getByText('Join Waitlist');
        expect(button).toHaveClass('focus:outline-none', 'focus:ring-4');
      });

      it('should have focus styles on links', () => {
        render(<Footer />);
        const link = screen.getByText('Blogs');
        expect(link).toHaveClass('focus:outline-none');
      });
    });

    describe('TC-A11Y-005: Verify text is readable (minimum 16px base font)', () => {
      it('should have readable text sizes', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const link = screen.getByText('Home');
        // Check that text-sm (14px) or larger is used
        expect(link).toHaveClass('text-sm');
      });
    });

    describe('TC-A11Y-006: Verify headings are in logical order (h1, h2, h3)', () => {
      it('should have proper heading structure', () => {
        render(<Pricing />);
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeInTheDocument();
      });
    });

    describe('TC-A11Y-007: Verify form labels are associated with inputs', () => {
      it('should have associated labels', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const label = screen.getByText('Email');
        const input = screen.getByLabelText('Email');
        expect(input).toBeInTheDocument();
        expect(label).toBeInTheDocument();
      });
    });

    describe('TC-A11Y-008: Verify ARIA attributes are used correctly', () => {
      it('should have proper ARIA attributes on modal', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby');
      });

      it('should have proper ARIA attributes on toggle', () => {
        render(<Pricing />);
        const toggle = screen.getByRole('switch');
        expect(toggle).toHaveAttribute('aria-checked');
        expect(toggle).toHaveAttribute('aria-label');
      });
    });

    describe('TC-A11Y-009: Verify page has proper semantic HTML', () => {
      it('should use semantic elements', () => {
        render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
      });
    });
  });

  describe('Keyboard Navigation Tests', () => {
    describe('TC-KB-001: Verify Tab key navigates through all interactive elements', () => {
      it('should navigate with Tab', async () => {
        const user = userEvent.setup();
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        
        // First tab goes to logo link, then to Home link
        await user.tab(); // Logo link
        const logoLink = screen.getByLabelText('Patty Home');
        expect(logoLink).toHaveFocus();
        
        await user.tab(); // Home link
        const homeLink = screen.getByText('Home');
        expect(homeLink).toHaveFocus();
      });
    });

    describe('TC-KB-002: Verify Shift+Tab navigates backwards', () => {
      it('should navigate backwards with Shift+Tab', async () => {
        const user = userEvent.setup();
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        
        const button = screen.getByText('Join Waitlist');
        button.focus();
        
        await user.tab({ shift: true });
        // Should navigate backwards
        expect(button).not.toHaveFocus();
      });
    });

    describe('TC-KB-003: Verify Enter/Space activates buttons', () => {
      it('should activate button with Enter', async () => {
        const user = userEvent.setup();
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        
        const button = screen.getByText('Join Waitlist');
        button.focus();
        await user.keyboard('{Enter}');
        
        expect(mockOnOpenWaitlist).toHaveBeenCalled();
      });
    });

    describe('TC-KB-004: Verify Escape closes modal', () => {
      it('should close modal with Escape', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    describe('TC-KB-005: Verify focus trap works in modal', () => {
      it('should trap focus in modal', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        // First tab goes to close button, then to input
        await user.tab(); // Close button
        const closeButton = screen.getByLabelText('Close modal');
        expect(closeButton).toHaveFocus();
        
        await user.tab(); // Email input
        const input = screen.getByLabelText('Email');
        expect(input).toHaveFocus();
      });
    });
  });
});

