'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, CheckCircle, Loader2, Search, ChevronDown } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

// Comprehensive country list with flags
const countries: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰' },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵' },
  { code: 'MM', name: 'Myanmar', dialCode: '+95', flag: '🇲🇲' },
  { code: 'KH', name: 'Cambodia', dialCode: '+855', flag: '🇰🇭' },
  { code: 'LA', name: 'Laos', dialCode: '+856', flag: '🇱🇦' },
  { code: 'MN', name: 'Mongolia', dialCode: '+976', flag: '🇲🇳' },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿' },
  { code: 'UZ', name: 'Uzbekistan', dialCode: '+998', flag: '🇺🇿' },
  { code: 'IQ', name: 'Iraq', dialCode: '+964', flag: '🇮🇶' },
  { code: 'IR', name: 'Iran', dialCode: '+98', flag: '🇮🇷' },
  { code: 'AF', name: 'Afghanistan', dialCode: '+93', flag: '🇦🇫' },
  { code: 'JO', name: 'Jordan', dialCode: '+962', flag: '🇯🇴' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961', flag: '🇱🇧' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
  { code: 'YE', name: 'Yemen', dialCode: '+967', flag: '🇾🇪' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿' },
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦' },
  { code: 'TN', name: 'Tunisia', dialCode: '+216', flag: '🇹🇳' },
  { code: 'LY', name: 'Libya', dialCode: '+218', flag: '🇱🇾' },
  { code: 'SD', name: 'Sudan', dialCode: '+249', flag: '🇸🇩' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251', flag: '🇪🇹' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬' },
  { code: 'RW', name: 'Rwanda', dialCode: '+250', flag: '🇷🇼' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: '🇿🇲' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼' },
  { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴' },
  { code: 'MZ', name: 'Mozambique', dialCode: '+258', flag: '🇲🇿' },
  { code: 'MG', name: 'Madagascar', dialCode: '+261', flag: '🇲🇬' },
  { code: 'MU', name: 'Mauritius', dialCode: '+230', flag: '🇲🇺' },
  { code: 'RE', name: 'Réunion', dialCode: '+262', flag: '🇷🇪' },
  { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾' },
  { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: '🇵🇾' },
  { code: 'BO', name: 'Bolivia', dialCode: '+591', flag: '🇧🇴' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨' },
  { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷' },
  { code: 'PA', name: 'Panama', dialCode: '+507', flag: '🇵🇦' },
  { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras', dialCode: '+504', flag: '🇭🇳' },
  { code: 'NI', name: 'Nicaragua', dialCode: '+505', flag: '🇳🇮' },
  { code: 'SV', name: 'El Salvador', dialCode: '+503', flag: '🇸🇻' },
  { code: 'DO', name: 'Dominican Republic', dialCode: '+1', flag: '🇩🇴' },
  { code: 'CU', name: 'Cuba', dialCode: '+53', flag: '🇨🇺' },
  { code: 'JM', name: 'Jamaica', dialCode: '+1', flag: '🇯🇲' },
  { code: 'TT', name: 'Trinidad and Tobago', dialCode: '+1', flag: '🇹🇹' },
  { code: 'BB', name: 'Barbados', dialCode: '+1', flag: '🇧🇧' },
  { code: 'BS', name: 'Bahamas', dialCode: '+1', flag: '🇧🇸' },
  { code: 'IS', name: 'Iceland', dialCode: '+354', flag: '🇮🇸' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺' },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹' },
  { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾' },
  { code: 'AL', name: 'Albania', dialCode: '+355', flag: '🇦🇱' },
  { code: 'MK', name: 'North Macedonia', dialCode: '+389', flag: '🇲🇰' },
  { code: 'RS', name: 'Serbia', dialCode: '+381', flag: '🇷🇸' },
  { code: 'ME', name: 'Montenegro', dialCode: '+382', flag: '🇲🇪' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dialCode: '+387', flag: '🇧🇦' },
  { code: 'XK', name: 'Kosovo', dialCode: '+383', flag: '🇽🇰' },
];

// Sort countries alphabetically, but keep USA and India at the top (USA first, then India)
const sortedCountries = [
  ...countries.filter(c => c.code === 'US'),
  ...countries.filter(c => c.code === 'IN'),
  ...countries.filter(c => c.code !== 'US' && c.code !== 'IN').sort((a, b) => a.name.localeCompare(b.name))
];

// Role options
const roles = [
  'Founder',
  'Co-Founder',
  'CEO',
  'CTO',
  'CPO',
  'CMO',
  'CFO',
  'Product Manager',
  'Senior Product Manager',
  'Principal Product Manager',
  'VP of Product',
  'Head of Product',
  'Product Owner',
  'Engineering Manager',
  'Senior Engineer',
  'Software Engineer',
  'Frontend Engineer',
  'Backend Engineer',
  'Full Stack Engineer',
  'DevOps Engineer',
  'QA Engineer',
  'Tech Lead',
  'Engineering Director',
  'VP of Engineering',
  'Designer',
  'UI/UX Designer',
  'Product Designer',
  'Visual Designer',
  'Design Director',
  'Head of Design',
  'Marketing Manager',
  'Growth Manager',
  'Marketing Director',
  'Sales Manager',
  'Business Development',
  'Operations Manager',
  'Project Manager',
  'Program Manager',
  'Scrum Master',
  'Data Analyst',
  'Data Scientist',
  'Business Analyst',
  'Consultant',
  'Investor',
  'Student',
  'Other'
].sort((a, b) => a.localeCompare(b));

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(sortedCountries.find(c => c.code === 'US') || sortedCountries[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [roleSearch, setRoleSearch] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const roleSearchRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const countryDropdownContentRef = useRef<HTMLDivElement>(null);
  const roleDropdownContentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLSpanElement>(null);

  const filteredCountries = countrySearch
    ? sortedCountries.filter(country =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.dialCode.includes(countrySearch) ||
      country.code.toLowerCase().includes(countrySearch.toLowerCase())
    )
    : sortedCountries;

  const filteredRoles = roleSearch
    ? roles.filter(role =>
      role.toLowerCase().includes(roleSearch.toLowerCase())
    )
    : roles;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small timeout to allow animation to start/element to mount
      const timer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        } else if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
      setIsCountryDropdownOpen(false);
      setCountrySearch('');
      setIsRoleDropdownOpen(false);
      setRoleSearch('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
        setCountrySearch('');
      }
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRoleDropdownOpen(false);
        setRoleSearch('');
      }
    };

    if (isCountryDropdownOpen || isRoleDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isCountryDropdownOpen, isRoleDropdownOpen]);

  // Focus trap and Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (isCountryDropdownOpen) {
          setIsCountryDropdownOpen(false);
          setCountrySearch('');
        } else if (isRoleDropdownOpen) {
          setIsRoleDropdownOpen(false);
          setRoleSearch('');
        } else {
          onClose();
        }
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isCountryDropdownOpen, isRoleDropdownOpen]);

  // Animate modal entrance/exit
  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      }
      if (modalContentRef.current) {
        gsap.fromTo(
          modalContentRef.current,
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    } else {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      }
      if (modalContentRef.current) {
        gsap.to(modalContentRef.current, {
          scale: 0.95,
          opacity: 0,
          y: 20,
          duration: 0.2,
          ease: 'power2.in',
        });
      }
    }
  }, [isOpen]);

  // Animate dropdowns
  useEffect(() => {
    if (isCountryDropdownOpen && countryDropdownContentRef.current) {
      gsap.fromTo(
        countryDropdownContentRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.2 }
      );
    } else if (countryDropdownContentRef.current) {
      gsap.to(countryDropdownContentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.15,
      });
    }
  }, [isCountryDropdownOpen]);

  useEffect(() => {
    if (isRoleDropdownOpen && roleDropdownContentRef.current) {
      gsap.fromTo(
        roleDropdownContentRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.2 }
      );
    } else if (roleDropdownContentRef.current) {
      gsap.to(roleDropdownContentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.15,
      });
    }
  }, [isRoleDropdownOpen]);

  // Animate loading state
  useEffect(() => {
    if (loading) {
      if (loaderRef.current) {
        gsap.fromTo(
          loaderRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.2 }
        );
      }
      if (loaderTextRef.current) {
        gsap.fromTo(
          loaderTextRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 }
        );
      }
    }
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call and Captcha verification
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-lg bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
      >
        <div ref={modalRef}>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full p-1"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {step === 'form' ? (
              <>
                <div className="mb-8">
                  <h2 id="waitlist-modal-title" className="text-3xl font-medium text-white mb-2">Join the Waitlist</h2>
                  <p className="text-neutral-300">Secure your spot for early access.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-neutral-400 ml-1">Name</label>
                    <input
                      ref={firstInputRef}
                      id="name"
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-medium text-neutral-400 ml-1">Phone</label>
                    <div className="flex gap-2">
                      <div className="relative flex-shrink-0" ref={countryDropdownRef}>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCountryDropdownOpen(!isCountryDropdownOpen);
                            if (!isCountryDropdownOpen) {
                              setTimeout(() => countrySearchRef.current?.focus(), 100);
                            }
                          }}
                          className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors min-w-[160px]"
                          aria-label="Select country"
                        >
                          <span className="text-lg">{selectedCountry.flag}</span>
                          <span className="text-xs">{selectedCountry.dialCode}</span>
                          <ChevronDown size={14} className={`ml-auto transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isCountryDropdownOpen && (
                            <div
                              ref={countryDropdownContentRef}
                              className="absolute top-full left-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl z-50 max-h-[300px] overflow-hidden flex flex-col w-[320px]"
                            >
                              <div className="p-2 border-b border-neutral-800">
                                <div className="relative">
                                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                                  <input
                                    ref={countrySearchRef}
                                    type="text"
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    placeholder="Search country..."
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 pl-10 py-2 text-white text-sm focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
                                  />
                                </div>
                              </div>
                              <div className="overflow-y-auto max-h-[240px]">
                                {filteredCountries.length > 0 ? (
                                  filteredCountries.map((country) => (
                                    <button
                                      key={country.code}
                                      type="button"
                                      onClick={() => {
                                        setSelectedCountry(country);
                                        setIsCountryDropdownOpen(false);
                                        setCountrySearch('');
                                      }}
                                      className={`w-full flex items-start gap-3 px-4 py-2.5 text-left text-sm transition-colors ${selectedCountry.code === country.code
                                          ? 'bg-neutral-800 text-white'
                                          : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                                        }`}
                                    >
                                      <span className="text-xl flex-shrink-0 mt-0.5">{country.flag}</span>
                                      <span className="flex-1 min-w-0 break-words leading-tight">{country.name}</span>
                                      <span className="text-neutral-500 text-xs flex-shrink-0">{country.dialCode}</span>
                                    </button>
                                  ))
                                ) : (
                                  <div className="px-4 py-8 text-center text-neutral-500 text-sm">
                                    No countries found
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-neutral-400 ml-1">Email</label>
                    <input
                      id="email"
                      required
                      type="email"
                      placeholder="john@company.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="role" className="text-xs font-medium text-neutral-400 ml-1">Role</label>
                      <div className="relative" ref={roleDropdownRef}>
                        <button
                          type="button"
                          onClick={() => {
                            setIsRoleDropdownOpen(!isRoleDropdownOpen);
                            if (!isRoleDropdownOpen) {
                              setTimeout(() => roleSearchRef.current?.focus(), 100);
                            }
                          }}
                          className="w-full flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                          aria-label="Select role"
                        >
                          <span className={selectedRole ? 'text-white' : 'text-neutral-500'}>
                            {selectedRole || 'Select Role'}
                          </span>
                          <ChevronDown size={14} className={`text-neutral-500 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isRoleDropdownOpen && (
                            <div
                              ref={roleDropdownContentRef}
                              className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl z-50 max-h-[300px] overflow-hidden flex flex-col"
                            >
                              <div className="p-2 border-b border-neutral-800">
                                <div className="relative">
                                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                                  <input
                                    ref={roleSearchRef}
                                    type="text"
                                    value={roleSearch}
                                    onChange={(e) => setRoleSearch(e.target.value)}
                                    placeholder="Search role..."
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 pl-10 py-2 text-white text-sm focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
                                  />
                                </div>
                              </div>
                              <div className="overflow-y-auto max-h-[240px]">
                                {filteredRoles.length > 0 ? (
                                  filteredRoles.map((role) => (
                                    <button
                                      key={role}
                                      type="button"
                                      onClick={() => {
                                        setSelectedRole(role);
                                        setIsRoleDropdownOpen(false);
                                        setRoleSearch('');
                                      }}
                                      className={`w-full flex items-start gap-3 px-4 py-2.5 text-left text-sm transition-colors ${selectedRole === role
                                          ? 'bg-neutral-800 text-white'
                                          : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                                        }`}
                                    >
                                      <span className="flex-1 min-w-0 break-words leading-tight">{role}</span>
                                    </button>
                                  ))
                                ) : (
                                  <div className="px-4 py-8 text-center text-neutral-500 text-sm">
                                    No roles found
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-xs font-medium text-neutral-400 ml-1">Company</label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Acme Inc."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={(e) => {
                        if (!loading) {
                          gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
                        }
                      }}
                      aria-busy={loading}
                      className="w-full bg-white text-black font-semibold rounded-xl py-4 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div
                          ref={loaderRef}
                          className="flex items-center gap-2"
                        >
                          <Loader2 className="animate-spin" size={20} />
                          <span ref={loaderTextRef}>Processing...</span>
                        </div>
                      ) : (
                        <span>Join Waitlist</span>
                      )}
                    </button>
                    <p className="text-xs text-center text-neutral-500 mt-4">
                      This site is protected by reCAPTCHA and the Google
                      <a href="#" className="underline hover:text-neutral-400 mx-1 focus:outline-none focus:text-white">Privacy Policy</a> and
                      <a href="#" className="underline hover:text-neutral-400 mx-1 focus:outline-none focus:text-white">Terms of Service</a> apply.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-12 text-center space-y-6" role="alert" aria-live="polite">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                  <CheckCircle size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-medium text-white">You're on the list!</h3>
                  <p className="text-neutral-300 max-w-xs mx-auto">We'll notify you as soon as your spot opens up. Keep an eye on your inbox.</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-neutral-800 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                  // Explicitly focusing this button in success state is good practice but strict trap logic handles cycling.
                  // Since we change content, focus might be lost if we don't handle it.
                  ref={(el) => {
                    if (el && step === 'success') el.focus();
                  }}
                >
                  Close
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;