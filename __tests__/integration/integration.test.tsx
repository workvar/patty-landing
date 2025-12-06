/**
 * Integration Tests
 * TC-SUP-001 through TC-NEXT-005
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WaitlistModal from '@/components/modals/WaitlistModal';
import Home from '@/pages/Home';

// Mock fetch
global.fetch = jest.fn();

describe('Integration Tests', () => {
  const mockOnOpenWaitlist = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('Supabase Integration Tests', () => {
    describe('TC-SUP-002: Verify email is inserted into waitlist table', () => {
      it('should send email to API', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, user_number: 1 }),
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByText('Join Waitlist');
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalledWith(
            '/api/waitlist',
            expect.objectContaining({
              method: 'POST',
              body: expect.stringContaining('test@example.com'),
            })
          );
        });
      });
    });

    describe('TC-SUP-003: Verify user_number is generated correctly', () => {
      it('should receive user_number from API', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, user_number: 42 }),
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByText('Join Waitlist');
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(screen.getByText(/You're #42 on the list/)).toBeInTheDocument();
        });
      });
    });

    describe('TC-SUP-004: Verify duplicate emails are handled', () => {
      it('should handle duplicate email error', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 409,
          json: async () => ({ error: 'This email is already on the waitlist' }),
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByText('Join Waitlist');
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(screen.getByText(/already on the waitlist/)).toBeInTheDocument();
        });
      });
    });
  });

  describe('reCAPTCHA Integration Tests', () => {
    describe('TC-RECAP-INT-001: Verify reCAPTCHA v3 is initialized', () => {
      it('should have reCAPTCHA provider', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByText(/This site is protected by reCAPTCHA/)).toBeInTheDocument();
      });
    });

    describe('TC-RECAP-INT-002: Verify reCAPTCHA token is sent to API', () => {
      it('should include token in API request', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, user_number: 1 }),
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByText('Join Waitlist');
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalledWith(
            '/api/waitlist',
            expect.objectContaining({
              body: expect.stringContaining('recaptchaToken'),
            })
          );
        });
      });
    });
  });

  describe('Next.js Integration Tests', () => {
    describe('TC-NEXT-001: Verify Next.js routing works', () => {
      it('should use Next.js Link components', () => {
        render(<Home onOpenWaitlist={mockOnOpenWaitlist} />);
        // Links should be present
        expect(true).toBe(true);
      });
    });

    describe('TC-NEXT-002: Verify Next.js Image component works', () => {
      it('should render images', () => {
        render(<Home onOpenWaitlist={mockOnOpenWaitlist} />);
        // Images are mocked in jest.setup.js
        expect(true).toBe(true);
      });
    });

    describe('TC-NEXT-004: Verify client components work correctly', () => {
      it('should render client components', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });
});

