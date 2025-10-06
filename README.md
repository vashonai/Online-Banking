# Online-Banking
1) Project Goal

Build a responsive web dashboard where a customer can view and manage their personal banking in a safe, simple interface. Focus on fundamentals: clear UX, clean HTML/CSS, secure Java backend, and testable features.

⸻

2) Tech Stack & Constraints
	•	Backend: Java 17+, Spring Boot (or plain Servlets if preferred), JDBC or JPA/Hibernate, H2/MySQL/Postgres
	•	Frontend: HTML5, CSS3 (no frameworks required), optional vanilla JavaScript
	•	Testing: JUnit + Mockito (backend), basic HTML/CSS validation
	•	Auth: Session-based login (Spring Security or a simple custom filter)
	•	Build/Run: Maven or Gradle; provide a one-command run

⸻

3) Core Features (10) with Acceptance Criteria
	1.	User Authentication (Login/Logout)
	•	AC: Valid users can log in; invalid users see helpful errors; session expires on logout/inactivity.
	2.	Account Overview
	•	AC: Shows list of accounts (e.g., Checking, Savings) with masked numbers and current balances; loads under 1s on local machine.
	3.	Recent Transactions
	•	AC: Table of last 20 transactions with date, merchant, amount, type (debit/credit), running balance.
	4.	Transaction Search & Filter
	•	AC: Filter by date range, amount range, and type; results paginate if >50.
	5.	Funds Transfer (Internal)
	•	AC: Move money between own accounts; validates sufficient balance; writes a new transaction pair (debit/credit).
	6.	Bill Pay / Payees
	•	AC: Add/edit/delete payees; schedule a one-time payment; show status (Scheduled/Processed/Failed).
	7.	Spending Insights
	•	AC: Category totals for the current month (e.g., Food, Utilities); simple bar chart or table (no external JS libs required).
	8.	Budget/Goal Tracker
	•	AC: Create a savings goal (target amount & date); show progress and a simple progress bar in CSS.
	9.	Notifications Center
	•	AC: Show basic alerts (low balance, large transaction). Users can mark as read.
	10.	Secure Profile & Settings
	•	AC: Update display name and contact email; change password with current-password check; confirmation messages.

Stretch (optional): Dark mode toggle, downloadable statements (PDF), multi-factor mock (code sent to console/log).

⸻

4) UX & Design Section (deliver before coding UI)

Deliverables (as a mini design sprint):
	1.	Personas (2)
	•	“Student Sam” (mobile-first, small balances)
	•	“Graduate Grace” (multiple accounts, pays bills monthly)
	2.	Primary User Flows (3)
	•	Log in → View accounts → Inspect a transaction
	•	Search transactions by date/category → Export/print
	•	Transfer funds → Confirm → See updated balances
	3.	Low-Fidelity Wireframes
	•	Screens: Login, Dashboard (accounts), Transactions, Transfer, Payees, Insights, Notifications, Profile
	•	Use grayscale boxes, clear hierarchy; annotate with key interactions.
	4.	UI Style Tokens
	•	Typography scale (e.g., h1 28px, h2 22px, body 16px)
	•	Spacing (4/8/16/24px), border radius (4px), elevation rules
	•	Color palette with accessible contrasts (WCAG AA): primary, surface, error, success
	5.	Responsive Spec
	•	Breakpoints: mobile ≤480px, tablet 481–1024px, desktop >1024px
	•	Show how the account cards and tables reflow
	6.	Accessibility Checklist
	•	Semantic HTML (landmarks, labels), form error messages, focus states, tab navigation, color contrast

Submission: a short PDF (≤8 pages) or a simple HTML doc with images of wireframes + tokens + flows.

⸻

5) Data Model (starter)
	•	User(id, email, password_hash, display_name, created_at)
	•	Account(id, user_id, type, masked_number, balance)
	•	Transaction(id, account_id, ts, merchant, category, amount, direction, running_balance)
	•	Payee(id, user_id, name, account_ref, last_paid_at)
	•	Payment(id, user_id, payee_id, amount, scheduled_for, status)
	•	Goal(id, user_id, name, target_amount, target_date, saved_amount)
	•	Notification(id, user_id, created_at, kind, message, is_read)

Seed the DB with 2 users, 3–4 accounts, and ~100 transactions.
