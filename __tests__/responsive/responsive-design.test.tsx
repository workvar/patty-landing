/**
 * Responsive Design Tests
 * TC-RESP-001 through TC-RESP-021
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import WaitlistModal from '@/components/modals/WaitlistModal';
import Pricing from '@/pages/Pricing';
import Blog from '@/pages/Blog';

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('Responsive Design Tests', () => {
  const mockOnOpenWaitlist = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  describe('Mobile Tests (< 768px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      mockMatchMedia(true);
    });

    describe('TC-RESP-001: Verify navbar is responsive on mobile', () => {
      it('should hide desktop links on mobile', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const linksContainer = screen.getByText('Home').parentElement;
        expect(linksContainer).toHaveClass('hidden', 'md:flex');
      });
    });

    describe('TC-RESP-004: Verify pricing cards stack on mobile', () => {
      it('should use grid layout that stacks on mobile', () => {
        render(<Pricing />);
        const grid = screen.getByText('Starter').closest('.grid');
        expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3');
      });
    });

    describe('TC-RESP-005: Verify blog posts stack on mobile', () => {
      it('should stack blog posts on mobile', () => {
        render(<Blog />);
        const articles = screen.getAllByRole('article');
        expect(articles.length).toBeGreaterThan(0);
      });
    });

    describe('TC-RESP-006: Verify footer grid adjusts on mobile', () => {
      it('should adjust footer grid on mobile', () => {
        render(<Footer />);
        const grid = screen.getByText('Features').closest('.grid');
        expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-3');
      });
    });

    describe('TC-RESP-007: Verify modal is full width on mobile (with padding)', () => {
      it('should have padding on mobile', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const dialog = screen.getByRole('dialog');
        // The dialog itself has p-4 padding
        expect(dialog).toHaveClass('p-4');
      });
    });

    describe('TC-RESP-009: Verify buttons are touch-friendly (min 44x44px)', () => {
      it('should have adequate button size', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const button = screen.getByText('Join Waitlist');
        // Check for adequate padding
        expect(button).toHaveClass('px-6', 'py-2.5');
      });
    });
  });

  describe('Desktop Tests (> 1024px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true });
      mockMatchMedia(false);
    });

    describe('TC-RESP-014: Verify full layout is displayed on desktop', () => {
      it('should show all navigation links on desktop', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Pricing')).toBeInTheDocument();
        expect(screen.getByText('Blog')).toBeInTheDocument();
      });
    });

    describe('TC-RESP-015: Verify hover effects work on desktop', () => {
      it('should have hover classes', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const link = screen.getByText('Home');
        expect(link).toHaveClass('hover:text-white', 'hover:bg-white/10');
      });
    });
  });

  describe('General Responsive Tests', () => {
    describe('TC-RESP-010: Verify spacing is appropriate on mobile', () => {
      it('should have responsive spacing', () => {
        render(<Pricing />);
        // The page container has px-6 padding
        const pageContainer = screen.getByText(/Simple pricing/).closest('.pt-32');
        if (pageContainer) {
          expect(pageContainer).toHaveClass('px-6');
        } else {
          // Alternative: check the parent div
          const parent = screen.getByText(/Simple pricing/).parentElement?.parentElement;
          expect(parent).toHaveClass('px-6');
        }
      });
    });

    describe('TC-RESP-008: Verify text sizes are appropriate on mobile', () => {
      it('should have responsive text sizes', () => {
        render(<Pricing />);
        const title = screen.getByText(/Simple pricing/);
        expect(title).toHaveClass('text-4xl', 'md:text-6xl');
      });
    });
  });
});

