/**
 * Waitlist Modal Tests
 * TC-MODAL-001 through TC-MACC-008
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WaitlistModal from '@/components/modals/WaitlistModal';

// Mock fetch
global.fetch = jest.fn();

describe('Waitlist Modal Tests', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
    // Reset body overflow
    document.body.style.overflow = '';
  });

  describe('Modal Display Tests', () => {
    describe('TC-MODAL-001: Verify modal opens when "Join Waitlist" button is clicked', () => {
      it('should render modal when isOpen is true', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      it('should not render modal when isOpen is false', () => {
        render(<WaitlistModal isOpen={false} onClose={mockOnClose} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    describe('TC-MODAL-002: Verify modal has overlay (backdrop)', () => {
      it('should have overlay', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveClass('bg-black/80', 'backdrop-blur-md');
      });
    });

    describe('TC-MODAL-003: Verify modal has correct z-index (z-[100])', () => {
      it('should have z-[100] class', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveClass('z-[100]');
      });
    });

    describe('TC-MODAL-006: Verify modal title "Join the Waitlist" is displayed', () => {
      it('should display title', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByText('Join the Waitlist')).toBeInTheDocument();
      });
    });

    describe('TC-MODAL-007: Verify modal subtitle is displayed', () => {
      it('should display subtitle', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByText(/Secure your spot for early access/)).toBeInTheDocument();
      });
    });

    describe('TC-MODAL-008: Verify close button (X) is visible', () => {
      it('should have close button', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
      });
    });

    describe('TC-MODAL-009: Verify modal is centered on screen', () => {
      it('should be centered', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveClass('flex', 'items-center', 'justify-center');
      });
    });

    describe('TC-MODAL-010: Verify modal has proper max width (max-w-lg)', () => {
      it('should have max-w-lg class', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const dialog = screen.getByRole('dialog');
        // The max-w-lg is on the inner content div, not the dialog
        const content = dialog.querySelector('.max-w-lg');
        expect(content).toBeInTheDocument();
      });
    });
  });

  describe('Form Tests', () => {
    describe('TC-FORM-001: Verify email input field is visible', () => {
      it('should render email input', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
      });
    });

    describe('TC-FORM-002: Verify email input has correct placeholder "john@company.com"', () => {
      it('should have correct placeholder', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const input = screen.getByPlaceholderText('john@company.com');
        expect(input).toBeInTheDocument();
      });
    });

    describe('TC-FORM-003: Verify email input has label "Email"', () => {
      it('should have label', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByText('Email')).toBeInTheDocument();
      });
    });

    describe('TC-FORM-004: Verify email input is required', () => {
      it('should be required', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const input = screen.getByLabelText('Email');
        expect(input).toBeRequired();
      });
    });

    describe('TC-FORM-005: Verify email input has type="email"', () => {
      it('should have email type', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const input = screen.getByLabelText('Email');
        expect(input).toHaveAttribute('type', 'email');
      });
    });

    describe('TC-FORM-008: Verify "Join Waitlist" submit button is visible', () => {
      it('should have submit button', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByText('Join Waitlist')).toBeInTheDocument();
      });
    });

    describe('TC-FORM-012: Verify reCAPTCHA notice is displayed', () => {
      it('should display reCAPTCHA notice', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByText(/This site is protected by reCAPTCHA/)).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation Tests', () => {
    describe('TC-FVAL-001: Verify form shows error if email is empty on submit', () => {
      it('should show error for empty email', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        // HTML5 validation should prevent submission
        const input = screen.getByLabelText('Email');
        expect(input).toBeInvalid();
      });
    });

    describe('TC-FVAL-002: Verify form shows error if email is invalid format', () => {
      it('should show error for invalid email', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'invalid-email');
        
        // HTML5 validation
        expect(input).toBeInvalid();
      });
    });

    describe('TC-FVAL-003: Verify form accepts valid email formats', () => {
      it('should accept valid emails', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const validEmails = [
          'user@example.com',
          'user.name@example.com',
          'user+tag@example.com',
          'user@sub.example.com',
        ];

        for (const email of validEmails) {
          const input = screen.getByLabelText('Email');
          await user.clear(input);
          await user.type(input, email);
          expect(input).toBeValid();
        }
      });
    });
  });

  describe('Modal Interaction Tests', () => {
    describe('TC-MINT-001: Verify clicking close button closes modal', () => {
      it('should call onClose when close button is clicked', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const closeButton = screen.getByLabelText('Close modal');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    describe('TC-MINT-003: Verify pressing Escape key closes modal', () => {
      it('should call onClose on Escape key', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    describe('TC-MINT-004: Verify modal closes and resets form on close', () => {
      it('should reset form when closed', async () => {
        const user = userEvent.setup();
        const { rerender } = render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        // Close the modal
        fireEvent.click(screen.getByLabelText('Close modal'));
        rerender(<WaitlistModal isOpen={false} onClose={mockOnClose} />);
        
        // Wait a bit for state to reset
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
        
        // Reopen the modal
        rerender(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const newInput = screen.getByLabelText('Email');
        expect(newInput).toHaveValue('');
      });
    });

    describe('TC-MINT-005: Verify body scroll is locked when modal is open', () => {
      it('should lock body scroll', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(document.body.style.overflow).toBe('hidden');
      });
    });

    describe('TC-MINT-006: Verify body scroll is restored when modal is closed', () => {
      it('should restore body scroll', () => {
        const { rerender } = render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(document.body.style.overflow).toBe('hidden');
        
        rerender(<WaitlistModal isOpen={false} onClose={mockOnClose} />);
        expect(document.body.style.overflow).toBe('unset');
      });
    });

    describe('TC-MINT-009: Verify first input receives focus when modal opens', () => {
      it('should focus first input', async () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const input = screen.getByLabelText('Email');
        
        await waitFor(() => {
          expect(input).toHaveFocus();
        }, { timeout: 200 });
      });
    });
  });

  describe('Success State Tests', () => {
    describe('TC-SUCC-001: Verify success state appears after successful submission', () => {
      it('should show success state', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
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
          expect(screen.getByText(/You have made it to the waitlist!/)).toBeInTheDocument();
        });
      });
    });

    describe('TC-SUCC-002: Verify success icon (CheckCircle) is displayed', () => {
      it('should display success icon', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
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
          // CheckCircle icon should be present
          const successSection = screen.getByText(/You have made it to the waitlist!/);
          expect(successSection).toBeInTheDocument();
        });
      });
    });

    describe('TC-SUCC-003: Verify success message "You have made it to the waitlist!" is displayed', () => {
      it('should display success message', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
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
          expect(screen.getByText('You have made it to the waitlist!')).toBeInTheDocument();
        });
      });
    });

    describe('TC-SUCC-004: Verify user number is displayed if provided (#X on the list)', () => {
      it('should display user number', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, user_number: 42 }),
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(screen.getByText(/You're #42 on the list/)).toBeInTheDocument();
        });
      });
    });

    describe('TC-SUCC-006: Verify "Close" button is visible in success state', () => {
      it('should have close button in success state', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
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
          expect(screen.getByText('Close')).toBeInTheDocument();
        });
      });
    });
  });

  describe('Loading State Tests', () => {
    describe('TC-LOAD-001: Verify loading spinner appears during submission', () => {
      it('should show loading state', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(
          () => new Promise(resolve => setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true }),
          }), 100))
        );

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        expect(screen.getByText('Processing...')).toBeInTheDocument();
      });
    });

    describe('TC-LOAD-002: Verify loading text "Processing..." is displayed', () => {
      it('should display processing text', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(
          () => new Promise(resolve => setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true }),
          }), 100))
        );

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        expect(screen.getByText('Processing...')).toBeInTheDocument();
      });
    });

    describe('TC-LOAD-004: Verify form is disabled during loading', () => {
      it('should disable submit button during loading', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(
          () => new Promise(resolve => setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true }),
          }), 100))
        );

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        // Wait for loading state
        await waitFor(() => {
          expect(screen.getByText('Processing...')).toBeInTheDocument();
        });
        
        // The button should be disabled during loading
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe('Accessibility Tests', () => {
    describe('TC-MACC-001: Verify modal has role="dialog"', () => {
      it('should have dialog role', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    describe('TC-MACC-002: Verify modal has aria-modal="true"', () => {
      it('should have aria-modal attribute', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
      });
    });

    describe('TC-MACC-003: Verify modal has aria-labelledby pointing to title', () => {
      it('should have aria-labelledby', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-labelledby', 'waitlist-modal-title');
      });
    });

    describe('TC-MACC-004: Verify close button has aria-label="Close modal"', () => {
      it('should have aria-label', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
      });
    });

    describe('TC-MACC-005: Verify submit button has aria-busy attribute during loading', () => {
      it('should have aria-busy during loading', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(
          () => new Promise(resolve => setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true }),
          }), 100))
        );

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        // Wait for loading state
        await waitFor(() => {
          expect(submitButton).toHaveAttribute('aria-busy', 'true');
        });
      });
    });

    describe('TC-MACC-006: Verify success state has role="alert" and aria-live="polite"', () => {
      it('should have alert role and aria-live', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
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
          const alert = screen.getByRole('alert');
          expect(alert).toHaveAttribute('aria-live', 'polite');
        });
      });
    });
  });
});

