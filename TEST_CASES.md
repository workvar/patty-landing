# Comprehensive Test Cases for Patty AI Website

## Table of Contents
1. [Navigation & Layout Tests](#navigation--layout-tests)
2. [Home Page Tests](#home-page-tests)
3. [Pricing Page Tests](#pricing-page-tests)
4. [Blog Page Tests](#blog-page-tests)
5. [Waitlist Modal Tests](#waitlist-modal-tests)
6. [API Tests](#api-tests)
7. [Responsive Design Tests](#responsive-design-tests)
8. [Accessibility Tests](#accessibility-tests)
9. [Performance Tests](#performance-tests)
10. [Cross-Browser Tests](#cross-browser-tests)
11. [Animation & Interaction Tests](#animation--interaction-tests)
12. [Form Validation Tests](#form-validation-tests)
13. [Integration Tests](#integration-tests)
14. [Security Tests](#security-tests)
15. [Edge Cases & Error Handling](#edge-cases--error-handling)

---

## Navigation & Layout Tests

### Navbar Tests
- **TC-NAV-001**: Verify navbar is visible at the top of all pages
- **TC-NAV-002**: Verify navbar logo is clickable and navigates to home page
- **TC-NAV-003**: Verify navbar logo has correct alt text "WorkVar Logo"
- **TC-NAV-004**: Verify navbar has glass effect when scrolled (after 20px scroll)
- **TC-NAV-005**: Verify navbar background is transparent on page load
- **TC-NAV-006**: Verify navbar transitions smoothly between transparent and glass states
- **TC-NAV-007**: Verify "Home" link navigates to "/"
- **TC-NAV-008**: Verify "Pricing" link navigates to "/pricing"
- **TC-NAV-009**: Verify "Blog" link navigates to "/blog"
- **TC-NAV-010**: Verify active page link is highlighted (if implemented)
- **TC-NAV-011**: Verify "Join Waitlist" button opens waitlist modal
- **TC-NAV-012**: Verify navbar is fixed and stays at top during scroll
- **TC-NAV-013**: Verify navbar has correct z-index (z-50) to stay above content
- **TC-NAV-014**: Verify navbar animations (fade in from top) work on page load
- **TC-NAV-015**: Verify navbar links have hover effects (text color change, background)
- **TC-NAV-016**: Verify navbar is responsive on mobile devices
- **TC-NAV-017**: Verify navbar links are accessible via keyboard navigation
- **TC-NAV-018**: Verify navbar has proper focus states for accessibility

### Footer Tests
- **TC-FOOT-001**: Verify footer is visible at the bottom of all pages
- **TC-FOOT-002**: Verify footer logo is clickable and navigates to home
- **TC-FOOT-003**: Verify footer displays current year in copyright
- **TC-FOOT-004**: Verify footer has correct company name "WorkVar Pvt. Ltd."
- **TC-FOOT-005**: Verify footer sections are displayed correctly:
  - Features section
  - Legal section
  - Resources section
  - About Us section
  - Support section
- **TC-FOOT-006**: Verify footer links have hover effects
- **TC-FOOT-007**: Verify footer "Blogs" link navigates to "/blog"
- **TC-FOOT-008**: Verify footer links with "#" href don't navigate (placeholder links)
- **TC-FOOT-009**: Verify footer animations (fade in on scroll) work
- **TC-FOOT-010**: Verify footer is responsive (grid layout changes on mobile)
- **TC-FOOT-011**: Verify footer has proper spacing and padding
- **TC-FOOT-012**: Verify footer links are keyboard accessible
- **TC-FOOT-013**: Verify footer has proper focus states

---

## Home Page Tests

### Hero Section Tests
- **TC-HERO-001**: Verify hero section is visible on page load
- **TC-HERO-002**: Verify hero title "Don't build blindly. Plan with precision." is displayed
- **TC-HERO-003**: Verify hero subtitle text is displayed correctly
- **TC-HERO-004**: Verify "Join Waitlist" button is visible and clickable
- **TC-HERO-005**: Verify "Join Waitlist" button opens waitlist modal
- **TC-HERO-006**: Verify badge "Patty Beta is releasing on January 6, 2026" is displayed
- **TC-HERO-007**: Verify hero animations (fade in, slide up) work on page load
- **TC-HERO-008**: Verify 3D product mockup is displayed
- **TC-HERO-009**: Verify mockup has floating animation
- **TC-HERO-010**: Verify typing animation in mockup chat works
- **TC-HERO-011**: Verify conversation state transitions (typing → thinking → responded)
- **TC-HERO-012**: Verify thinking dots animation appears during thinking state
- **TC-HERO-013**: Verify user stories appear after thinking animation
- **TC-HERO-014**: Verify mockup has correct aspect ratio (16/9 on mobile, 21/9 on desktop)
- **TC-HERO-015**: Verify hero section has proper spacing and padding
- **TC-HERO-016**: Verify hero section is responsive on mobile devices
- **TC-HERO-017**: Verify background gradient effects are visible
- **TC-HERO-018**: Verify hero section has minimum height (110vh)

### Features Section Tests
- **TC-FEAT-001**: Verify features section is visible on scroll
- **TC-FEAT-002**: Verify section title "Total control. Zero administrative overhead." is displayed
- **TC-FEAT-003**: Verify section subtitle is displayed
- **TC-FEAT-004**: Verify all 4 features are displayed:
  - Deep Context Awareness
  - Auto Sprints
  - Perfect Specs
  - Living Roadmaps
- **TC-FEAT-005**: Verify each feature has correct icon
- **TC-FEAT-006**: Verify each feature has title and description
- **TC-FEAT-007**: Verify feature cards have correct grid layout (bento grid)
- **TC-FEAT-008**: Verify feature cards animate on scroll into view
- **TC-FEAT-009**: Verify feature cards have hover effects
- **TC-FEAT-010**: Verify features section is responsive
- **TC-FEAT-011**: Verify feature components render correctly

### Impact Section Tests
- **TC-IMP-001**: Verify impact section is visible
- **TC-IMP-002**: Verify all 4 impact metrics are displayed:
  - Speed
  - Clarity
  - Accuracy
  - Decision
- **TC-IMP-003**: Verify each impact metric has correct icon
- **TC-IMP-004**: Verify each impact metric has title and description
- **TC-IMP-005**: Verify impact cards animate on scroll
- **TC-IMP-006**: Verify impact section is responsive

### Workflow Section Tests
- **TC-WORK-001**: Verify workflow section is visible
- **TC-WORK-002**: Verify workflow steps are displayed correctly
- **TC-WORK-003**: Verify workflow animations work
- **TC-WORK-004**: Verify workflow section is responsive

### Use Cases Section Tests
- **TC-USE-001**: Verify use cases section is visible
- **TC-USE-002**: Verify use case cards are displayed
- **TC-USE-003**: Verify use case cards have hover effects
- **TC-USE-004**: Verify use cases section is responsive

### Coverage Section Tests
- **TC-COV-001**: Verify coverage section is visible
- **TC-COV-002**: Verify all coverage areas are displayed:
  - Teams
  - Content & Freelance
  - Learning & Skill Development
  - Personal Life
- **TC-COV-003**: Verify each coverage card has correct content
- **TC-COV-004**: Verify coverage cards are interactive
- **TC-COV-005**: Verify coverage section is responsive

### Integrations Section Tests
- **TC-INT-001**: Verify integrations section is visible
- **TC-INT-002**: Verify all integration icons are displayed:
  - Airtable
  - Excel
  - Google Calendar
  - Jira
  - Notion
  - Slack
- **TC-INT-003**: Verify integration icons are clickable (if links are implemented)
- **TC-INT-004**: Verify integration icons have hover effects
- **TC-INT-005**: Verify integrations section is responsive
- **TC-INT-006**: Verify integration icons have proper alt text

### General Home Page Tests
- **TC-HOME-001**: Verify page loads without errors
- **TC-HOME-002**: Verify all sections are in correct order
- **TC-HOME-003**: Verify smooth scrolling between sections
- **TC-HOME-004**: Verify page has proper meta tags
- **TC-HOME-005**: Verify page title is correct
- **TC-HOME-006**: Verify GridBackground component renders correctly

---

## Pricing Page Tests

### Pricing Display Tests
- **TC-PRICE-001**: Verify pricing page loads correctly
- **TC-PRICE-002**: Verify page title "Simple pricing for serious builders." is displayed
- **TC-PRICE-003**: Verify page subtitle is displayed
- **TC-PRICE-004**: Verify all 3 pricing plans are displayed:
  - Starter ($0/mo)
  - Pro ($29/mo)
  - Team ($99/mo)
- **TC-PRICE-005**: Verify each plan has correct price
- **TC-PRICE-006**: Verify each plan has description
- **TC-PRICE-007**: Verify each plan has feature list
- **TC-PRICE-008**: Verify "Most Popular" badge appears on Pro plan
- **TC-PRICE-009**: Verify pricing cards have correct styling
- **TC-PRICE-010**: Verify pricing cards animate on page load

### Billing Toggle Tests
- **TC-BILL-001**: Verify billing toggle (Monthly/Yearly) is visible
- **TC-BILL-002**: Verify toggle defaults to "Yearly" (annual = true)
- **TC-BILL-003**: Verify clicking toggle switches between Monthly and Yearly
- **TC-BILL-004**: Verify "-20% discount" text is visible when Yearly is selected
- **TC-BILL-005**: Verify toggle has smooth animation
- **TC-BILL-006**: Verify toggle is keyboard accessible
- **TC-BILL-007**: Verify toggle has proper ARIA attributes (role="switch", aria-checked)
- **TC-BILL-008**: Verify prices update when toggle is switched (if implemented)

### Pricing Buttons Tests
- **TC-PBTN-001**: Verify "Start Building" button is on Starter plan
- **TC-PBTN-002**: Verify "Get Started" button is on Pro and Team plans
- **TC-PBTN-003**: Verify buttons have hover effects
- **TC-PBTN-004**: Verify buttons have focus states
- **TC-PBTN-005**: Verify buttons are keyboard accessible
- **TC-PBTN-006**: Verify buttons trigger correct action (if implemented)

### General Pricing Page Tests
- **TC-PGEN-001**: Verify pricing page is responsive
- **TC-PGEN-002**: Verify pricing cards stack vertically on mobile
- **TC-PGEN-003**: Verify animations work on page load
- **TC-PGEN-004**: Verify page has proper spacing

---

## Blog Page Tests

### Blog Display Tests
- **TC-BLOG-001**: Verify blog page loads correctly
- **TC-BLOG-002**: Verify page title "Thoughts" is displayed
- **TC-BLOG-003**: Verify page subtitle is displayed
- **TC-BLOG-004**: Verify all blog posts are displayed
- **TC-BLOG-005**: Verify each blog post has:
  - Category
  - Title
  - Date
  - Read time
- **TC-BLOG-006**: Verify blog posts are in correct order
- **TC-BLOG-007**: Verify blog post cards have hover effects
- **TC-BLOG-008**: Verify ArrowUpRight icon appears on hover
- **TC-BLOG-009**: Verify blog posts animate on page load

### Blog Post Interaction Tests
- **TC-BPOST-001**: Verify clicking a blog post navigates (if links are implemented)
- **TC-BPOST-002**: Verify blog posts are keyboard accessible
- **TC-BPOST-003**: Verify blog posts have proper focus states

### General Blog Page Tests
- **TC-BGEN-001**: Verify blog page is responsive
- **TC-BGEN-002**: Verify blog posts stack correctly on mobile
- **TC-BGEN-003**: Verify page has proper spacing

---

## Waitlist Modal Tests

### Modal Display Tests
- **TC-MODAL-001**: Verify modal opens when "Join Waitlist" button is clicked
- **TC-MODAL-002**: Verify modal has overlay (backdrop)
- **TC-MODAL-003**: Verify modal has correct z-index (z-[100])
- **TC-MODAL-004**: Verify modal has entrance animation (fade in, scale up)
- **TC-MODAL-005**: Verify modal has exit animation when closed
- **TC-MODAL-006**: Verify modal title "Join the Waitlist" is displayed
- **TC-MODAL-007**: Verify modal subtitle is displayed
- **TC-MODAL-008**: Verify close button (X) is visible
- **TC-MODAL-009**: Verify modal is centered on screen
- **TC-MODAL-010**: Verify modal has proper max width (max-w-lg)

### Form Tests
- **TC-FORM-001**: Verify email input field is visible
- **TC-FORM-002**: Verify email input has correct placeholder "john@company.com"
- **TC-FORM-003**: Verify email input has label "Email"
- **TC-FORM-004**: Verify email input is required
- **TC-FORM-005**: Verify email input has type="email"
- **TC-FORM-006**: Verify email input has proper styling
- **TC-FORM-007**: Verify email input has focus states
- **TC-FORM-008**: Verify "Join Waitlist" submit button is visible
- **TC-FORM-009**: Verify submit button has loading state
- **TC-FORM-010**: Verify submit button shows "Processing..." when loading
- **TC-FORM-011**: Verify submit button is disabled during submission
- **TC-FORM-012**: Verify reCAPTCHA notice is displayed

### Form Validation Tests
- **TC-FVAL-001**: Verify form shows error if email is empty on submit
- **TC-FVAL-002**: Verify form shows error if email is invalid format
- **TC-FVAL-003**: Verify form accepts valid email formats
- **TC-FVAL-004**: Verify error message is displayed in red
- **TC-FVAL-005**: Verify error message clears when user starts typing

### Modal Interaction Tests
- **TC-MINT-001**: Verify clicking close button closes modal
- **TC-MINT-002**: Verify clicking overlay closes modal (if implemented)
- **TC-MINT-003**: Verify pressing Escape key closes modal
- **TC-MINT-004**: Verify modal closes and resets form on close
- **TC-MINT-005**: Verify body scroll is locked when modal is open
- **TC-MINT-006**: Verify body scroll is restored when modal is closed
- **TC-MINT-007**: Verify focus trap works (Tab key cycles through focusable elements)
- **TC-MINT-008**: Verify focus returns to trigger button after modal closes (if implemented)
- **TC-MINT-009**: Verify first input receives focus when modal opens

### Success State Tests
- **TC-SUCC-001**: Verify success state appears after successful submission
- **TC-SUCC-002**: Verify success icon (CheckCircle) is displayed
- **TC-SUCC-003**: Verify success message "You have made it to the waitlist!" is displayed
- **TC-SUCC-004**: Verify user number is displayed if provided (#X on the list)
- **TC-SUCC-005**: Verify success message text is displayed
- **TC-SUCC-006**: Verify "Close" button is visible in success state
- **TC-SUCC-007**: Verify clicking "Close" button closes modal
- **TC-SUCC-008**: Verify success state has proper animations

### Loading State Tests
- **TC-LOAD-001**: Verify loading spinner appears during submission
- **TC-LOAD-002**: Verify loading text "Processing..." is displayed
- **TC-LOAD-003**: Verify loading animation works correctly
- **TC-LOAD-004**: Verify form is disabled during loading

### Accessibility Tests
- **TC-MACC-001**: Verify modal has role="dialog"
- **TC-MACC-002**: Verify modal has aria-modal="true"
- **TC-MACC-003**: Verify modal has aria-labelledby pointing to title
- **TC-MACC-004**: Verify close button has aria-label="Close modal"
- **TC-MACC-005**: Verify submit button has aria-busy attribute during loading
- **TC-MACC-006**: Verify success state has role="alert" and aria-live="polite"
- **TC-MACC-007**: Verify all interactive elements are keyboard accessible
- **TC-MACC-008**: Verify focus is properly managed

---

## API Tests

### Waitlist API Tests
- **TC-API-001**: Verify POST /api/waitlist endpoint exists
- **TC-API-002**: Verify API accepts JSON body with email and recaptchaToken
- **TC-API-003**: Verify API returns 400 if email is missing
- **TC-API-004**: Verify API returns 400 if email is not a string
- **TC-API-005**: Verify API returns 400 if email doesn't contain "@"
- **TC-API-006**: Verify API returns 400 if recaptchaToken is missing
- **TC-API-007**: Verify API verifies reCAPTCHA token with Google
- **TC-API-008**: Verify API returns 400 if reCAPTCHA verification fails
- **TC-API-009**: Verify API returns 400 if reCAPTCHA score < 0.5
- **TC-API-010**: Verify API inserts email into Supabase waitlist table
- **TC-API-011**: Verify API returns 409 if email already exists (duplicate)
- **TC-API-012**: Verify API returns user_number in response
- **TC-API-013**: Verify API returns 200 on successful submission
- **TC-API-014**: Verify API returns 500 on server errors
- **TC-API-015**: Verify API handles Supabase connection errors
- **TC-API-016**: Verify API validates environment variables are set
- **TC-API-017**: Verify API returns proper error messages
- **TC-API-018**: Verify API logs errors to console

### API Security Tests
- **TC-APISEC-001**: Verify API validates reCAPTCHA before processing
- **TC-APISEC-002**: Verify API doesn't expose sensitive information in errors
- **TC-APISEC-003**: Verify API has rate limiting (if implemented)
- **TC-APISEC-004**: Verify API validates Content-Type header
- **TC-APISEC-005**: Verify API handles malformed JSON gracefully

---

## Responsive Design Tests

### Mobile Tests (< 768px)
- **TC-RESP-001**: Verify navbar is responsive on mobile
- **TC-RESP-002**: Verify hero section is responsive on mobile
- **TC-RESP-003**: Verify features section grid adjusts on mobile
- **TC-RESP-004**: Verify pricing cards stack on mobile
- **TC-RESP-005**: Verify blog posts stack on mobile
- **TC-RESP-006**: Verify footer grid adjusts on mobile
- **TC-RESP-007**: Verify modal is full width on mobile (with padding)
- **TC-RESP-008**: Verify text sizes are appropriate on mobile
- **TC-RESP-009**: Verify buttons are touch-friendly (min 44x44px)
- **TC-RESP-010**: Verify spacing is appropriate on mobile

### Tablet Tests (768px - 1024px)
- **TC-RESP-011**: Verify layout adapts correctly on tablet
- **TC-RESP-012**: Verify grid layouts work on tablet
- **TC-RESP-013**: Verify navigation is accessible on tablet

### Desktop Tests (> 1024px)
- **TC-RESP-014**: Verify full layout is displayed on desktop
- **TC-RESP-015**: Verify hover effects work on desktop
- **TC-RESP-016**: Verify animations are smooth on desktop

### Viewport Tests
- **TC-RESP-017**: Verify page works at 320px width (smallest mobile)
- **TC-RESP-018**: Verify page works at 1920px width (large desktop)
- **TC-RESP-019**: Verify page works at 2560px width (4K)
- **TC-RESP-020**: Verify page works in portrait orientation
- **TC-RESP-021**: Verify page works in landscape orientation

---

## Accessibility Tests

### WCAG Compliance Tests
- **TC-A11Y-001**: Verify all images have alt text
- **TC-A11Y-002**: Verify all interactive elements are keyboard accessible
- **TC-A11Y-003**: Verify focus indicators are visible
- **TC-A11Y-004**: Verify color contrast meets WCAG AA standards
- **TC-A11Y-005**: Verify text is readable (minimum 16px base font)
- **TC-A11Y-006**: Verify headings are in logical order (h1, h2, h3)
- **TC-A11Y-007**: Verify form labels are associated with inputs
- **TC-A11Y-008**: Verify ARIA attributes are used correctly
- **TC-A11Y-009**: Verify page has proper semantic HTML
- **TC-A11Y-010**: Verify skip links are present (if implemented)

### Screen Reader Tests
- **TC-SR-001**: Verify screen reader can navigate navbar
- **TC-SR-002**: Verify screen reader announces modal opening
- **TC-SR-003**: Verify screen reader announces form errors
- **TC-SR-004**: Verify screen reader announces success message
- **TC-SR-005**: Verify screen reader can navigate footer links

### Keyboard Navigation Tests
- **TC-KB-001**: Verify Tab key navigates through all interactive elements
- **TC-KB-002**: Verify Shift+Tab navigates backwards
- **TC-KB-003**: Verify Enter/Space activates buttons
- **TC-KB-004**: Verify Escape closes modal
- **TC-KB-005**: Verify focus trap works in modal

---

## Performance Tests

### Load Time Tests
- **TC-PERF-001**: Verify page loads in < 3 seconds on 3G
- **TC-PERF-002**: Verify page loads in < 1 second on 4G
- **TC-PERF-003**: Verify First Contentful Paint (FCP) < 1.8s
- **TC-PERF-004**: Verify Largest Contentful Paint (LCP) < 2.5s
- **TC-PERF-005**: Verify Time to Interactive (TTI) < 3.8s

### Resource Tests
- **TC-PERF-006**: Verify images are optimized
- **TC-PERF-007**: Verify fonts load efficiently
- **TC-PERF-008**: Verify JavaScript bundles are optimized
- **TC-PERF-009**: Verify CSS is minified
- **TC-PERF-010**: Verify no unused JavaScript is loaded

### Animation Performance Tests
- **TC-PERF-011**: Verify animations run at 60fps
- **TC-PERF-012**: Verify animations don't cause layout shifts
- **TC-PERF-013**: Verify scroll animations are performant

---

## Cross-Browser Tests

### Chrome Tests
- **TC-BROWS-001**: Verify site works in Chrome (latest)
- **TC-BROWS-002**: Verify site works in Chrome (previous version)

### Firefox Tests
- **TC-BROWS-003**: Verify site works in Firefox (latest)
- **TC-BROWS-004**: Verify site works in Firefox (previous version)

### Safari Tests
- **TC-BROWS-005**: Verify site works in Safari (latest)
- **TC-BROWS-006**: Verify site works in Safari (previous version)

### Edge Tests
- **TC-BROWS-007**: Verify site works in Edge (latest)
- **TC-BROWS-008**: Verify site works in Edge (previous version)

### Mobile Browser Tests
- **TC-BROWS-009**: Verify site works in Chrome Mobile
- **TC-BROWS-010**: Verify site works in Safari iOS
- **TC-BROWS-011**: Verify site works in Samsung Internet

---

## Animation & Interaction Tests

### GSAP Animation Tests
- **TC-ANIM-001**: Verify navbar fade-in animation works
- **TC-ANIM-002**: Verify hero section animations work
- **TC-ANIM-003**: Verify feature cards animate on scroll
- **TC-ANIM-004**: Verify footer animations work
- **TC-ANIM-005**: Verify pricing cards animate on load
- **TC-ANIM-006**: Verify blog posts animate on load
- **TC-ANIM-007**: Verify modal entrance/exit animations work
- **TC-ANIM-008**: Verify loading spinner animation works
- **TC-ANIM-009**: Verify ScrollTrigger animations work
- **TC-ANIM-010**: Verify animations don't break on fast scroll

### Interaction Tests
- **TC-INT-001**: Verify hover effects work on all interactive elements
- **TC-INT-002**: Verify button click animations work
- **TC-INT-003**: Verify smooth scrolling works
- **TC-INT-004**: Verify scroll position is maintained on navigation
- **TC-INT-005**: Verify page doesn't jump on load

---

## Form Validation Tests

### Email Validation Tests
- **TC-EMAIL-001**: Verify empty email shows validation error
- **TC-EMAIL-002**: Verify invalid email format shows error (e.g., "test")
- **TC-EMAIL-003**: Verify invalid email format shows error (e.g., "test@")
- **TC-EMAIL-004**: Verify invalid email format shows error (e.g., "@test.com")
- **TC-EMAIL-005**: Verify valid email formats are accepted:
  - "user@example.com"
  - "user.name@example.com"
  - "user+tag@example.com"
  - "user@sub.example.com"
- **TC-EMAIL-006**: Verify email validation happens on submit
- **TC-EMAIL-007**: Verify email validation doesn't block typing

### reCAPTCHA Tests
- **TC-RECAP-001**: Verify reCAPTCHA v3 loads correctly
- **TC-RECAP-002**: Verify reCAPTCHA token is generated on form submit
- **TC-RECAP-003**: Verify form submission fails if reCAPTCHA doesn't load
- **TC-RECAP-004**: Verify reCAPTCHA error message is displayed if verification fails
- **TC-RECAP-005**: Verify reCAPTCHA notice is visible

---

## Integration Tests

### Supabase Integration Tests
- **TC-SUP-001**: Verify Supabase connection works
- **TC-SUP-002**: Verify email is inserted into waitlist table
- **TC-SUP-003**: Verify user_number is generated correctly
- **TC-SUP-004**: Verify duplicate emails are handled
- **TC-SUP-005**: Verify Supabase errors are handled gracefully

### reCAPTCHA Integration Tests
- **TC-RECAP-INT-001**: Verify reCAPTCHA v3 is initialized
- **TC-RECAP-INT-002**: Verify reCAPTCHA token is sent to API
- **TC-RECAP-INT-003**: Verify reCAPTCHA verification with Google works
- **TC-RECAP-INT-004**: Verify reCAPTCHA score is checked

### Next.js Integration Tests
- **TC-NEXT-001**: Verify Next.js routing works
- **TC-NEXT-002**: Verify Next.js Image component works
- **TC-NEXT-003**: Verify Next.js Link component works
- **TC-NEXT-004**: Verify client components work correctly
- **TC-NEXT-005**: Verify server components work correctly

---

## Security Tests

### Input Sanitization Tests
- **TC-SEC-001**: Verify XSS attacks are prevented in email input
- **TC-SEC-002**: Verify SQL injection is prevented (handled by Supabase)
- **TC-SEC-003**: Verify email is sanitized before storage

### API Security Tests
- **TC-SEC-004**: Verify API validates all inputs
- **TC-SEC-005**: Verify API doesn't expose sensitive data
- **TC-SEC-006**: Verify API has proper error handling
- **TC-SEC-007**: Verify environment variables are not exposed

### reCAPTCHA Security Tests
- **TC-SEC-008**: Verify reCAPTCHA prevents bot submissions
- **TC-SEC-009**: Verify reCAPTCHA secret key is not exposed
- **TC-SEC-010**: Verify reCAPTCHA score threshold is enforced

---

## Edge Cases & Error Handling

### Network Error Tests
- **TC-EDGE-001**: Verify graceful handling of network timeout
- **TC-EDGE-002**: Verify graceful handling of network failure
- **TC-EDGE-003**: Verify error message is displayed on network error
- **TC-EDGE-004**: Verify form can be resubmitted after network error

### API Error Tests
- **TC-EDGE-005**: Verify 400 errors are handled gracefully
- **TC-EDGE-006**: Verify 409 errors (duplicate email) show appropriate message
- **TC-EDGE-007**: Verify 500 errors show user-friendly message
- **TC-EDGE-008**: Verify malformed API responses are handled

### Browser Compatibility Edge Cases
- **TC-EDGE-009**: Verify site works with JavaScript disabled (graceful degradation)
- **TC-EDGE-010**: Verify site works with cookies disabled
- **TC-EDGE-011**: Verify site works with localStorage disabled
- **TC-EDGE-012**: Verify site handles slow 3G connections

### Data Edge Cases
- **TC-EDGE-013**: Verify very long email addresses are handled
- **TC-EDGE-014**: Verify special characters in email are handled
- **TC-EDGE-015**: Verify Unicode characters in email are handled
- **TC-EDGE-016**: Verify empty form submission is prevented

### State Management Edge Cases
- **TC-EDGE-017**: Verify modal state resets correctly after close
- **TC-EDGE-018**: Verify form state doesn't persist after modal close
- **TC-EDGE-019**: Verify multiple rapid clicks on submit button are handled
- **TC-EDGE-020**: Verify modal can be opened/closed multiple times

### Scroll Edge Cases
- **TC-EDGE-021**: Verify animations work when scrolling very fast
- **TC-EDGE-022**: Verify animations work when scrolling backwards
- **TC-EDGE-023**: Verify page doesn't break on infinite scroll (if implemented)
- **TC-EDGE-024**: Verify scroll position is maintained on page refresh

### Environment Edge Cases
- **TC-EDGE-025**: Verify site works when environment variables are missing
- **TC-EDGE-026**: Verify site handles Supabase connection failures
- **TC-EDGE-027**: Verify site handles reCAPTCHA service unavailability

---

## Additional Test Scenarios

### User Journey Tests
- **TC-JOUR-001**: Complete user journey: Home → Click Join Waitlist → Fill Form → Submit → See Success
- **TC-JOUR-002**: User journey: Home → Navigate to Pricing → View Plans → Return Home
- **TC-JOUR-003**: User journey: Home → Navigate to Blog → View Posts → Return Home
- **TC-JOUR-004**: User journey: Scroll through entire home page → All sections visible

### SEO Tests
- **TC-SEO-001**: Verify page has proper meta title
- **TC-SEO-002**: Verify page has proper meta description
- **TC-SEO-003**: Verify page has proper Open Graph tags
- **TC-SEO-004**: Verify page has proper Twitter Card tags
- **TC-SEO-005**: Verify page has proper canonical URL
- **TC-SEO-006**: Verify page has proper structured data (if implemented)

### Analytics Tests (if implemented)
- **TC-ANAL-001**: Verify page view events are tracked
- **TC-ANAL-002**: Verify button click events are tracked
- **TC-ANAL-003**: Verify form submission events are tracked
- **TC-ANAL-004**: Verify scroll depth is tracked (if implemented)

### Cookie & Privacy Tests
- **TC-COOK-001**: Verify cookie consent banner appears (if implemented)
- **TC-COOK-002**: Verify privacy policy link works
- **TC-COOK-003**: Verify terms of service link works

---

## Test Execution Priority

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
- All cross-browser tests (latest versions)
- All performance tests
- All integration tests

### Medium (P2) - Nice to Have
- All animation tests
- All edge case tests
- All SEO tests
- Cross-browser tests (previous versions)

### Low (P3) - Optional
- Analytics tests
- Cookie & privacy tests
- User journey tests

---

## Test Coverage Summary

**Total Test Cases: 400+**

- Navigation & Layout: 31 tests
- Home Page: 50+ tests
- Pricing Page: 18 tests
- Blog Page: 9 tests
- Waitlist Modal: 50+ tests
- API Tests: 18 tests
- Responsive Design: 21 tests
- Accessibility: 15 tests
- Performance: 13 tests
- Cross-Browser: 11 tests
- Animation & Interaction: 19 tests
- Form Validation: 7 tests
- Integration: 9 tests
- Security: 10 tests
- Edge Cases: 27 tests
- Additional Scenarios: 12+ tests

---

## Notes

- All test cases should be executed in both development and production environments
- Test data should be cleaned up after testing
- Consider using automated testing tools (Jest, React Testing Library, Playwright, Cypress)
- Manual testing should complement automated tests
- Test on real devices, not just emulators
- Consider testing with assistive technologies (screen readers, keyboard-only navigation)
- Performance tests should be run on various network conditions
- Security tests should include penetration testing

