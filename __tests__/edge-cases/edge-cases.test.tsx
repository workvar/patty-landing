/**
 * Edge Cases & Error Handling Tests
 * TC-EDGE-001 through TC-EDGE-027
 */

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WaitlistModal from '@/components/modals/WaitlistModal';

// Mock fetch
global.fetch = jest.fn();

describe('Edge Cases & Error Handling Tests', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('Network Error Tests', () => {
    describe('TC-EDGE-001: Verify graceful handling of network timeout', () => {
      it('should handle timeout gracefully', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(
          () => new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 100)
          )
        );

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        await waitFor(() => {
          // Error message will be the error.message or fallback
          const errorElement = screen.getByText(/Timeout|Something went wrong/);
          expect(errorElement).toBeInTheDocument();
        });
      });
    });

    describe('TC-EDGE-002: Verify graceful handling of network failure', () => {
      it('should handle network failure', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        await waitFor(() => {
          // Error message will be the error.message or fallback
          const errorElement = screen.getByText(/Network error|Something went wrong/);
          expect(errorElement).toBeInTheDocument();
        });
      });
    });

    describe('TC-EDGE-003: Verify error message is displayed on network error', () => {
      it('should display error message', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        await waitFor(() => {
          const errorMessage = screen.getByText(/Network error|Something went wrong/);
          expect(errorMessage).toBeInTheDocument();
          expect(errorMessage).toHaveClass('text-red-400');
        });
      });
    });

    describe('TC-EDGE-004: Verify form can be resubmitted after network error', () => {
      it('should allow resubmission', async () => {
        (global.fetch as jest.Mock)
          .mockRejectedValueOnce(new Error('Network error'))
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true, user_number: 1 }),
          });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        await waitFor(() => {
          // Error message will be the error.message or fallback
          const errorElement = screen.getByText(/Network error|Something went wrong/);
          expect(errorElement).toBeInTheDocument();
        }, { timeout: 2000 });
        
        // Wait for loading to finish and error to be displayed
        await waitFor(() => {
          expect(screen.queryByText(/Processing.../)).not.toBeInTheDocument();
        }, { timeout: 2000 });
        
        // Resubmit - the button should be enabled again after error
        const submitButtonAfterError = screen.getByRole('button', { name: /Join Waitlist/i });
        expect(submitButtonAfterError).not.toBeDisabled();
        await user.click(submitButtonAfterError);
        
        await waitFor(() => {
          expect(screen.getByText(/You have made it to the waitlist!/)).toBeInTheDocument();
        }, { timeout: 3000 });
      });
    });
  });

  describe('API Error Tests', () => {
    describe('TC-EDGE-005: Verify 400 errors are handled gracefully', () => {
      it('should handle 400 error', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => ({ error: 'Valid email is required' }),
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        await waitFor(() => {
          // API returns error message in response - the error is thrown and displayed
          expect(screen.getByText(/Valid email is required/)).toBeInTheDocument();
        }, { timeout: 2000 });
      });
    });

    describe('TC-EDGE-006: Verify 409 errors (duplicate email) show appropriate message', () => {
      it('should show duplicate email message', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 409,
          json: async () => ({ error: 'This email is already on the waitlist' }),
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(screen.getByText(/already on the waitlist/)).toBeInTheDocument();
        }, { timeout: 1000 });
      });
    });

    describe('TC-EDGE-007: Verify 500 errors show user-friendly message', () => {
      it('should show user-friendly error for 500', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({ error: 'Internal server error' }),
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        await waitFor(() => {
          // API returns error message in response
          expect(screen.getByText(/Internal server error/)).toBeInTheDocument();
        }, { timeout: 1000 });
      });
    });
  });

  describe('Data Edge Cases', () => {
    describe('TC-EDGE-013: Verify very long email addresses are handled', () => {
      it('should handle long emails', async () => {
        const longEmail = 'a'.repeat(200) + '@example.com';
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, longEmail);
        
        // Should accept the input
        expect(input).toHaveValue(longEmail);
      });
    });

    describe('TC-EDGE-014: Verify special characters in email are handled', () => {
      it('should handle special characters', async () => {
        const specialEmail = 'user+tag-test@example.com';
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, specialEmail);
        
        expect(input).toHaveValue(specialEmail);
        expect(input).toBeValid();
      });
    });

    describe('TC-EDGE-016: Verify empty form submission is prevented', () => {
      it('should prevent empty submission', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        const input = screen.getByLabelText('Email');
        expect(input).toBeInvalid();
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });
  });

  describe('State Management Edge Cases', () => {
    describe('TC-EDGE-017: Verify modal state resets correctly after close', () => {
      it('should reset state on close', async () => {
        const { rerender } = render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const user = userEvent.setup();
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        fireEvent.click(screen.getByLabelText('Close modal'));
        rerender(<WaitlistModal isOpen={false} onClose={mockOnClose} />);
        
        // Wait for modal to close
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
        
        // Reopen the modal - state should be reset
        rerender(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        await waitFor(() => {
          const newInput = screen.getByLabelText('Email');
          expect(newInput).toHaveValue('');
        });
      });
    });

    describe('TC-EDGE-019: Verify multiple rapid clicks on submit button are handled', () => {
      it('should prevent multiple submissions', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(
          () => new Promise(resolve => setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true, user_number: 1 }),
          }), 100))
        );

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        // Click multiple times rapidly
        await user.click(submitButton);
        await user.click(submitButton);
        await user.click(submitButton);
        
        // The important thing is that fetch is only called once
        // (the button's disabled state prevents multiple submissions)
        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalledTimes(1);
        }, { timeout: 500 });
      });
    });

    describe('TC-EDGE-020: Verify modal can be opened/closed multiple times', () => {
      it('should handle multiple open/close cycles', () => {
        const { rerender } = render(<WaitlistModal isOpen={false} onClose={mockOnClose} />);
        
        // Open
        rerender(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        
        // Close
        rerender(<WaitlistModal isOpen={false} onClose={mockOnClose} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        
        // Open again
        rerender(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });
});

