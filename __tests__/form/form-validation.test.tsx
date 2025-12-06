/**
 * Form Validation Tests
 * TC-EMAIL-001 through TC-RECAP-005
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WaitlistModal from '@/components/modals/WaitlistModal';

// Mock fetch
global.fetch = jest.fn();

describe('Form Validation Tests', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('Email Validation Tests', () => {
    describe('TC-EMAIL-001: Verify empty email shows validation error', () => {
      it('should show HTML5 validation for empty email', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        const submitButton = screen.getByText('Join Waitlist');
        
        await user.click(submitButton);
        
        expect(input).toBeInvalid();
        expect(input).toHaveAttribute('required');
      });
    });

    describe('TC-EMAIL-002: Verify invalid email format shows error (e.g., "test")', () => {
      it('should invalidate "test"', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test');
        
        expect(input).toBeInvalid();
      });
    });

    describe('TC-EMAIL-003: Verify invalid email format shows error (e.g., "test@")', () => {
      it('should invalidate "test@"', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@');
        
        expect(input).toBeInvalid();
      });
    });

    describe('TC-EMAIL-004: Verify invalid email format shows error (e.g., "@test.com")', () => {
      it('should invalidate "@test.com"', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, '@test.com');
        
        expect(input).toBeInvalid();
      });
    });

    describe('TC-EMAIL-005: Verify valid email formats are accepted', () => {
      it('should accept "user@example.com"', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'user@example.com');
        
        expect(input).toBeValid();
      });

      it('should accept "user.name@example.com"', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'user.name@example.com');
        
        expect(input).toBeValid();
      });

      it('should accept "user+tag@example.com"', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'user+tag@example.com');
        
        expect(input).toBeValid();
      });

      it('should accept "user@sub.example.com"', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'user@sub.example.com');
        
        expect(input).toBeValid();
      });
    });

    describe('TC-EMAIL-006: Verify email validation happens on submit', () => {
      it('should validate on submit', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'invalid');
        
        const submitButton = screen.getByText('Join Waitlist');
        await user.click(submitButton);
        
        expect(input).toBeInvalid();
      });
    });

    describe('TC-EMAIL-007: Verify email validation doesn\'t block typing', () => {
      it('should allow typing', async () => {
        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test');
        
        expect(input).toHaveValue('test');
      });
    });
  });

  describe('reCAPTCHA Tests', () => {
    describe('TC-RECAP-001: Verify reCAPTCHA v3 loads correctly', () => {
      it('should have reCAPTCHA provider', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        // reCAPTCHA is mocked in jest.setup.js
        expect(screen.getByText(/This site is protected by reCAPTCHA/)).toBeInTheDocument();
      });
    });

    describe('TC-RECAP-002: Verify reCAPTCHA token is generated on form submit', () => {
      it('should generate token on submit', async () => {
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
              body: expect.stringContaining('recaptchaToken'),
            })
          );
        });
      });
    });

    describe('TC-RECAP-003: Verify form submission fails if reCAPTCHA doesn\'t load', () => {
      it('should handle reCAPTCHA not loaded', async () => {
        // Since the global mock always returns a function, we'll test the error handling
        // by making the executeRecaptcha function throw an error or return null
        // We need to override the mock for this test
        const reactGoogleRecaptchaV3 = require('react-google-recaptcha-v3');
        const originalUseGoogleReCaptcha = reactGoogleRecaptchaV3.useGoogleReCaptcha;
        
        // Override the mock to return null executeRecaptcha
        jest.spyOn(reactGoogleRecaptchaV3, 'useGoogleReCaptcha').mockReturnValue({
          executeRecaptcha: null,
        });

        const user = userEvent.setup();
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        
        const input = screen.getByLabelText('Email');
        await user.type(input, 'test@example.com');
        
        const submitButton = screen.getByRole('button', { name: /Join Waitlist/i });
        await user.click(submitButton);
        
        await waitFor(() => {
          // The error message will be "reCAPTCHA not loaded"
          expect(screen.getByText(/reCAPTCHA not loaded/)).toBeInTheDocument();
        }, { timeout: 2000 });
        
        // Restore the original mock
        jest.spyOn(reactGoogleRecaptchaV3, 'useGoogleReCaptcha').mockReturnValue(originalUseGoogleReCaptcha());
      });
    });

    describe('TC-RECAP-005: Verify reCAPTCHA notice is visible', () => {
      it('should display reCAPTCHA notice', () => {
        render(<WaitlistModal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByText(/This site is protected by reCAPTCHA/)).toBeInTheDocument();
      });
    });
  });
});

