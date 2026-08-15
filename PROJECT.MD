# Extroverts Signup Wizard - Web Replication

Frontend engineering assessment for a signup wizard replication task. Rebuilt the Extroverts mobile app's onboarding flow as a responsive web app.

Reference app: https://play.google.com/store/apps/details?id=com.pro.nubpack
Deadline: 21 August
Frontend only — no backend, all API calls mocked.

---

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- React Hook Form + Zod for validation
- Sonner for toasts
- Lucide for icons
- pnpm as package manager
- Deployed on Vercel

Went with Next.js over plain React/Vite because App Router routing felt cleaner for a multi-page wizard, and Vercel deploys are instant.

---

## Screens captured from reference app

Went through the actual app step by step and captured every screen before writing any code.

Pre-auth (4):
- Landing / splash
- Terms and conditions
- Location fetching
- Location permission fallback

Guest home + auth trigger (3):
- Home feed with Silver Club, event cards
- Scrolled feed
- "You need an account" bottom sheet

Auth (2):
- Enter email
- Enter OTP

Wizard (5 + 2 bottom sheets):
- Username
- Name
- Age (with DOB bottom sheet)
- Pronouns (with select bottom sheet)
- Invite code

Post-signup (2):
- Home feed logged in (Bronze Club, bottom nav)
- Notifications empty state

Some things I had to assume since not captured:
- Loading spinner states on buttons
- Focus states on inputs
- Error toasts styling
- Wizard progress indicator (didn't exist in app, added as improvement)

---

## Flow
Landing → Continue
↓
Terms → Accept
↓
Location → Enable
↓
Home (guest, Silver Club)
↓ tap JOIN
"You need an account" sheet → GET STARTED
↓
Signup: Email → PROCEED
↓
OTP (6-digit, mock code: 123456) → VERIFY
↓
Wizard (Getting Ready):

Username
Name (with confirm modal)
Age via DOB
Pronouns (max 3)
Invite code (optional) → SIGN UP
↓
Home logged in (Bronze Club + bottom nav)
text


---

## Progress

### Done

Setup
- [x] Next.js + TS + Tailwind + pnpm
- [x] Poppins font via next/font
- [x] Dark theme globals
- [x] Sonner toaster in root layout
- [x] Folder structure (components, pages, hooks, data, utils, lib)

Common UI
- [x] Button (primary / secondary / ghost, loading state, disabled state)
- [x] Input (with label, helperText, error)
- [x] Checkbox (with labelClassName for flexibility)
- [x] BottomSheet (slide-up on mobile, centered on desktop)
- [x] EmptyState
- [x] Logo (dot properly aligned per size)
- [x] ClubBadge (bronze / silver / gold hex badges)
- [x] RotatingText (animated text swap with configurable font size)

Layout
- [x] Header (guest vs logged-in variants)
- [x] BottomNav (only shows when logged in)
- [x] WizardShell (progress bar + step counter)

Pre-auth
- [x] Landing with gradient background
- [x] Terms and conditions
- [x] Location page with real browser geolocation API + fallback

Guest home
- [x] Header, Silver Club card with progress bar
- [x] HVT counter with rotating text
- [x] 3 mock event cards with images (Unsplash)
- [x] Event card with confidential strip
- [x] Auth bottom sheet trigger

Auth
- [x] Email page with Zod validation, newsletter checkbox
- [x] OTP page: 6 boxes, auto focus, backspace prev, paste support, resend with 30s cooldown, mock OTP 123456

Wizard
- [x] Username: uniqueness check with debounce (mock taken list), green check / red taken
- [x] Name: input + confirm modal ("cannot be changed later")
- [x] Age: readonly input opens DOB bottom sheet, DD/MM/YYYY, age <18 block
- [x] Pronouns: readonly input opens select sheet, max 3 with counter, toast on overflow
- [x] Invite code: optional field with manifesto text

Post-signup
- [x] Home feed detects user from localStorage
- [x] Bronze Club label + badge
- [x] Bottom nav appears
- [x] Event card CTA changes to VIEW FLYER
- [x] Spots left strip
- [x] Notifications empty state page

State + persistence
- [x] useSignupStore hook with localStorage
- [x] Data preserved across back navigation
- [x] Route guards on every wizard step
- [x] Guard bypasses to home if already logged in
- [x] Signup data cleared after successful signup

Extras
- [x] 404 page
- [x] Metadata + theme color
- [x] Safe area handling for mobile notches
- [x] Suspense boundary for useSearchParams
- [x] pnpm build passes clean
- [x] Deployed to Vercel

### Not needed (skipped intentionally)

- Backend integration — task says frontend only
- Real email OTP — mocked with 123456
- Real username uniqueness API — mocked with taken list
- Profile / chat / add pages (bottom nav items) — assessment doesn't ask
- Password auth — app uses OTP only
- Social login — not in reference

### Still to do

- [ ] Record 5 min screen demo
- [ ] Upload video to Drive / YouTube unlisted
- [ ] Submit Google Form with video link + deploy URL

---

## Improvements I added on top of the app

The brief explicitly said to identify and improve UX issues. Here's what I changed:

1. Age input in app was confusing — took DOB directly and auto-calculated age
2. Age <18 wasn't handled in app — added a clear block message
3. Added wizard progress bar + "Step X of 5" — app had none
4. Username availability shown in realtime (checking → available / taken)
5. Name step got a confirm modal since it can't be changed later
6. Pronouns bottom sheet shows counter (2/3 selected) — app didn't
7. Invalid selection over max shows toast, not silent fail
8. OTP resend has 30s cooldown to prevent spam
9. OTP supports paste (paste full 6 digits at once)
10. Location page has "Skip for now" fallback if user denies permission
11. Notifications empty state pattern reused-ready for other empty screens

---

## Validation rules

| Field | Rules |
|-------|-------|
| Email | Format valid, required, whitespace trimmed |
| OTP | Exactly 6 digits, numeric only |
| Username | 3-20 chars, alphanumeric + underscore, mock uniqueness |
| Name | Required, letters + space only, no whitespace-only |
| DOB | Valid date, age must be >= 18 |
| Pronouns | Min 1, max 3 |
| Invite code | Optional |

---

## Design tokens

Colors:
- BG: #000000
- Text: #ffffff / muted #8a8a8a
- Purple accent: #b57eff
- Orange (Dinner Event): #f5a34a
- Bronze: #c97a3e
- Silver: #c0c0c0

Font: Poppins (300-900 weights via next/font)

Components:
- Primary button: white bg, black text, rounded-full, full width
- Secondary button: transparent, white border
- Input: transparent bg, gray border, focus goes white
- Bottom sheet: dark bg, rounded-t on mobile, rounded full on desktop with backdrop blur

---

## Folder structure
src/
app/
layout.tsx
page.tsx (Landing)
not-found.tsx
globals.css
terms/page.tsx
location/page.tsx
home/page.tsx
notifications/page.tsx
signup/
email/page.tsx
otp/page.tsx
username/page.tsx
name/page.tsx
age/page.tsx
pronouns/page.tsx
invite/page.tsx
components/
ui/
Button.tsx
Input.tsx
Checkbox.tsx
BottomSheet.tsx
EmptyState.tsx
Logo.tsx
ClubBadge.tsx
RotatingText.tsx
layout/
Header.tsx
BottomNav.tsx
WizardShell.tsx
event/
EventCard.tsx
hooks/
useSignupStore.ts
data/
events.ts
pronouns.ts
utils/
validators.ts
age.ts
lib/
cn.ts

text


---

## Things worth noting

- All mock API delays are ~1-1.5s to simulate real network. Not instant so loading states are visible.
- OTP `123456` is intentional demo code — mentioned in the OTP screen hint too.
- Newsletter subscription is optional (checkbox), matches app behavior.
- The reference app has 5 wizard steps but brief says "4-step" — I kept 5 since that's what the app actually has.
- The Confidential striped overlay on location is decorative from app screenshots, replicated here too.
- localStorage keys: `signupData` (wizard progress), `user` (post-signup session), `termsAccepted`, `locationEnabled`, `userLocation`.
- Route guards prevent skipping steps by URL manipulation.
