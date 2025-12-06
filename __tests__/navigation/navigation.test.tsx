/**
 * Navigation & Layout Tests
 * TC-NAV-001 through TC-NAV-018
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navigation & Layout Tests', () => {
  const mockOnOpenWaitlist = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  describe('Navbar Tests', () => {
    describe('TC-NAV-001: Verify navbar is visible at the top of all pages', () => {
      it('should render navbar', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const nav = screen.getByRole('navigation', { hidden: true });
        expect(nav).toBeInTheDocument();
      });
    });

    describe('TC-NAV-002: Verify navbar logo is clickable and navigates to home page', () => {
      it('should have logo link to home', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const logoLink = screen.getByLabelText('Patty Home');
        expect(logoLink).toHaveAttribute('href', '/');
      });
    });

    describe('TC-NAV-003: Verify navbar logo has correct alt text "WorkVar Logo"', () => {
      it('should have correct alt text', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const logo = screen.getByAltText('WorkVar Logo');
        expect(logo).toBeInTheDocument();
      });
    });

    describe('TC-NAV-004: Verify navbar has glass effect when scrolled (after 20px scroll)', () => {
      it('should apply glass effect after scrolling', async () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const nav = screen.getByRole('navigation', { hidden: true });
        
        // Initially transparent
        expect(nav).not.toHaveClass('glass');
        
        // Simulate scroll
        Object.defineProperty(window, 'scrollY', { value: 21, writable: true });
        fireEvent.scroll(window);
        
        await waitFor(() => {
          expect(nav).toHaveClass('glass');
        });
      });
    });

    describe('TC-NAV-005: Verify navbar background is transparent on page load', () => {
      it('should have transparent background initially', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const nav = screen.getByRole('navigation', { hidden: true });
        expect(nav).toHaveClass('bg-transparent');
      });
    });

    describe('TC-NAV-006: Verify navbar transitions smoothly between transparent and glass states', () => {
      it('should have transition classes', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const nav = screen.getByRole('navigation', { hidden: true });
        expect(nav).toHaveClass('transition-all', 'duration-300');
      });
    });

    describe('TC-NAV-007: Verify "Home" link navigates to "/"', () => {
      it('should have home link', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const homeLink = screen.getByText('Home');
        expect(homeLink).toHaveAttribute('href', '/');
      });
    });

    describe('TC-NAV-008: Verify "Pricing" link navigates to "/pricing"', () => {
      it('should have pricing link', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const pricingLink = screen.getByText('Pricing');
        expect(pricingLink).toHaveAttribute('href', '/pricing');
      });
    });

    describe('TC-NAV-009: Verify "Blog" link navigates to "/blog"', () => {
      it('should have blog link', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const blogLink = screen.getByText('Blog');
        expect(blogLink).toHaveAttribute('href', '/blog');
      });
    });

    describe('TC-NAV-011: Verify "Join Waitlist" button opens waitlist modal', () => {
      it('should call onOpenWaitlist when clicked', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const button = screen.getByText('Join Waitlist');
        fireEvent.click(button);
        expect(mockOnOpenWaitlist).toHaveBeenCalledTimes(1);
      });
    });

    describe('TC-NAV-012: Verify navbar is fixed and stays at top during scroll', () => {
      it('should have fixed positioning', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const container = screen.getByRole('navigation', { hidden: true }).parentElement;
        expect(container).toHaveClass('fixed', 'top-0');
      });
    });

    describe('TC-NAV-013: Verify navbar has correct z-index (z-50) to stay above content', () => {
      it('should have z-50 class', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const container = screen.getByRole('navigation', { hidden: true }).parentElement;
        expect(container).toHaveClass('z-50');
      });
    });

    describe('TC-NAV-015: Verify navbar links have hover effects', () => {
      it('should have hover classes', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const homeLink = screen.getByText('Home');
        expect(homeLink).toHaveClass('hover:text-white', 'hover:bg-white/10');
      });
    });

    describe('TC-NAV-017: Verify navbar links are accessible via keyboard navigation', () => {
      it('should be keyboard accessible', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const homeLink = screen.getByText('Home');
        homeLink.focus();
        expect(homeLink).toHaveFocus();
      });
    });

    describe('TC-NAV-018: Verify navbar has proper focus states for accessibility', () => {
      it('should have focus styles', () => {
        render(<Navbar onOpenWaitlist={mockOnOpenWaitlist} />);
        const button = screen.getByText('Join Waitlist');
        expect(button).toHaveClass('focus:outline-none', 'focus:ring-4');
      });
    });
  });

  describe('Footer Tests', () => {
    describe('TC-FOOT-001: Verify footer is visible at the bottom of all pages', () => {
      it('should render footer', () => {
        render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
      });
    });

    describe('TC-FOOT-002: Verify footer logo is clickable and navigates to home', () => {
      it('should have logo link to home', () => {
        render(<Footer />);
        const logoLink = screen.getByLabelText('WorkVar Home');
        expect(logoLink).toHaveAttribute('href', '/');
      });
    });

    describe('TC-FOOT-003: Verify footer displays current year in copyright', () => {
      it('should display current year', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(`Copyright © ${currentYear}`))).toBeInTheDocument();
      });
    });

    describe('TC-FOOT-004: Verify footer has correct company name "WorkVar Pvt. Ltd."', () => {
      it('should display company name', () => {
        render(<Footer />);
        expect(screen.getByText(/WorkVar Pvt\. Ltd\./)).toBeInTheDocument();
      });
    });

    describe('TC-FOOT-005: Verify footer sections are displayed correctly', () => {
      it('should display all footer sections', () => {
        render(<Footer />);
        expect(screen.getByText('Features')).toBeInTheDocument();
        expect(screen.getByText('Legal')).toBeInTheDocument();
        expect(screen.getByText('Resources')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Support')).toBeInTheDocument();
      });
    });

    describe('TC-FOOT-006: Verify footer links have hover effects', () => {
      it('should have hover classes', () => {
        render(<Footer />);
        const blogsLink = screen.getByText('Blogs');
        expect(blogsLink).toHaveClass('hover:text-white');
      });
    });

    describe('TC-FOOT-007: Verify footer "Blogs" link navigates to "/blog"', () => {
      it('should have blogs link', () => {
        render(<Footer />);
        const blogsLink = screen.getByText('Blogs');
        expect(blogsLink).toHaveAttribute('href', '/blog');
      });
    });

    describe('TC-FOOT-008: Verify footer links with "#" href don\'t navigate (placeholder links)', () => {
      it('should have placeholder links', () => {
        render(<Footer />);
        const privacyLink = screen.getByText('Privacy Policy');
        expect(privacyLink).toHaveAttribute('href', '#');
      });
    });

    describe('TC-FOOT-012: Verify footer links are keyboard accessible', () => {
      it('should be keyboard accessible', () => {
        render(<Footer />);
        const blogsLink = screen.getByText('Blogs');
        blogsLink.focus();
        expect(blogsLink).toHaveFocus();
      });
    });

    describe('TC-FOOT-013: Verify footer has proper focus states', () => {
      it('should have focus classes', () => {
        render(<Footer />);
        const blogsLink = screen.getByText('Blogs');
        expect(blogsLink).toHaveClass('focus:text-white', 'focus:outline-none');
      });
    });
  });
});

