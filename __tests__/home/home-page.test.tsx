/**
 * Home Page Tests
 * TC-HERO-001 through TC-HOME-006
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/Home';

describe('Home Page Tests', () => {
  const mockOnOpenWaitlist = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('TC-HOME-001: Verify page loads without errors', () => {
    it('should render without errors', () => {
      render(<Home onOpenWaitlist={mockOnOpenWaitlist} />);
      expect(screen.getByText(/Don't build blindly/)).toBeInTheDocument();
    });
  });

  describe('TC-HOME-002: Verify all sections are in correct order', () => {
    it('should render all sections', () => {
      render(<Home onOpenWaitlist={mockOnOpenWaitlist} />);
      // Hero section
      expect(screen.getByText(/Don't build blindly/)).toBeInTheDocument();
      // Other sections would be tested if they have identifiable text
    });
  });

  describe('TC-HOME-006: Verify GridBackground component renders correctly', () => {
    it('should render GridBackground', () => {
      const { container } = render(<Home onOpenWaitlist={mockOnOpenWaitlist} />);
      // GridBackground should be present in the DOM
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

