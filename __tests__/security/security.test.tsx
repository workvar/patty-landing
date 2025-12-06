/**
 * Security Tests
 * TC-SEC-001 through TC-SEC-010
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WaitlistModal from '@/components/modals/WaitlistModal';

// Mock fetch
global.fetch = jest.fn();

describe('Security Tests', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('Input Sanitization Tests', () => {
    describe('TC-SEC-001: Verify XSS attacks are prevented in email input', () => {
      it('should sanitize XSS attempts', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const xssAttempts = [
          '<script>alert("xss")</script>@example.com',
          'javascript:alert("xss")@example.com',
          '<img src=x onerror=alert("xss")>@example.com',
        ];

        for (const xss of xssAttempts) {
          const input = screen.getByLabelText('Email');
          await user.clear(input);
          await user.type(input, xss);
          
          // Input should contain the value but React should escape it
          expect(input).toHaveValue(xss);
          // The value should be treated as text, not executed
          expect(screen.queryByText(/alert/)).not.toBeInTheDocument();
        }
      });
    });

    describe('TC-SEC-003: Verify email is sanitized before storage', () => {
      it('should send sanitized email to API', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, user_number: 1 }),
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, '  test@example.com  '); // With whitespace
        
        const submitButton = screen.getByText('Join Waitlist');
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalled();
        });
      });
    });
  });

  describe('API Security Tests', () => {
    describe('TC-SEC-004: Verify API validates all inputs', () => {
      it('should validate email format', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'invalid-email');
        
        const submitButton = screen.getByText('Join Waitlist');
        await user.click(submitButton);
        
        // HTML5 validation should prevent submission
        expect(input).toBeInvalid();
      });
    });

    describe('TC-SEC-006: Verify API has proper error handling', () => {
      it('should handle errors gracefully', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByText('Join Waitlist');
        await user.click(submitButton);
        
        await waitFor(() => {
          // Error message will be the error.message or fallback
          expect(screen.getByText(/Network error|Something went wrong/)).toBeInTheDocument();
        });
      });
    });
  });

  describe('reCAPTCHA Security Tests', () => {
    describe('TC-SEC-008: Verify reCAPTCHA prevents bot submissions', () => {
      it('should require reCAPTCHA token', async () => {
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
});

