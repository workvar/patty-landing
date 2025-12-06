# Test Suite Documentation

This directory contains comprehensive test cases for the Patty AI website, organized by category for easier debugging and maintenance.

## Test Structure

```
__tests__/
├── navigation/          # Navigation & Layout Tests (TC-NAV-001 to TC-FOOT-013)
├── home/                # Home Page Tests (TC-HERO-001 to TC-HOME-006)
├── pricing/             # Pricing Page Tests (TC-PRICE-001 to TC-PGEN-004)
├── blog/                # Blog Page Tests (TC-BLOG-001 to TC-BGEN-003)
├── waitlist/            # Waitlist Modal Tests (TC-MODAL-001 to TC-MACC-008)
├── api/                 # API Tests (TC-API-001 to TC-APISEC-005)
├── responsive/          # Responsive Design Tests (TC-RESP-001 to TC-RESP-021)
├── accessibility/       # Accessibility Tests (TC-A11Y-001 to TC-KB-005)
├── performance/         # Performance Tests (TC-PERF-001 to TC-PERF-013)
├── animation/           # Animation & Interaction Tests (TC-ANIM-001 to TC-INT-005)
├── form/                # Form Validation Tests (TC-EMAIL-001 to TC-RECAP-005)
├── integration/         # Integration Tests (TC-SUP-001 to TC-NEXT-005)
├── security/            # Security Tests (TC-SEC-001 to TC-SEC-010)
└── edge-cases/          # Edge Cases & Error Handling (TC-EDGE-001 to TC-EDGE-027)
```

## Running Tests

### Run all tests
```bash
pnpm test
```

### Run tests in watch mode
```bash
pnpm test:watch
```

### Run tests with coverage
```bash
pnpm test:coverage
```

### Run specific test file
```bash
pnpm test navigation/navigation.test.tsx
```

### Run tests matching a pattern
```bash
pnpm test --testNamePattern="TC-NAV-001"
```

## Test Coverage

The test suite covers **400+ test cases** across 15 categories:

- **Navigation & Layout**: 31 tests
- **Home Page**: 50+ tests
- **Pricing Page**: 18 tests
- **Blog Page**: 9 tests
- **Waitlist Modal**: 50+ tests
- **API Tests**: 18 tests
- **Responsive Design**: 21 tests
- **Accessibility**: 15 tests
- **Performance**: 13 tests
- **Animation & Interaction**: 19 tests
- **Form Validation**: 7 tests
- **Integration**: 9 tests
- **Security**: 10 tests
- **Edge Cases**: 27 tests

## Test Categories

### Critical (P0) - Must Test Before Launch
- All navigation tests
- All waitlist modal tests
- All API tests
- All form validation tests
- All security tests
- All accessibility tests (WCAG compliance)

### High (P1) - Should Test Before Launch
- All home page tests
- All responsive design tests
- All performance tests
- All integration tests

### Medium (P2) - Nice to Have
- All animation tests
- All edge case tests

## Debugging Tips

1. **Run tests in isolation**: Use `.only` or `.skip` on specific test cases
2. **Check console output**: Some tests log errors for debugging
3. **Use watch mode**: Automatically re-runs tests on file changes
4. **Check coverage**: Identify untested code paths
5. **Review test names**: Each test is named with its TC-ID for easy reference

## Mocking

The test suite uses extensive mocking for:
- Next.js router and navigation
- Next.js Image component
- GSAP animations
- reCAPTCHA v3
- Supabase client
- Fetch API

See `jest.setup.js` for mock configurations.

## Notes

- Some performance tests require actual browser environment (Lighthouse, Playwright)
- Cross-browser tests may need additional setup (Playwright, Cypress)
- Animation tests verify GSAP calls but not visual output
- API tests mock Supabase and reCAPTCHA services

