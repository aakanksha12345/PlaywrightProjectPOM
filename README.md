# Playwright + TypeScript + Page Object Model (ParaBank)

A **beginner-friendly, extendable** automation starter using the public
[ParaBank demo website](https://parabank.parasoft.com/parabank/index.htm).

## What you get

- **Page Object Model (POM)**: page classes keep locators and actions separate from tests.
- **Custom fixtures**: typed `loginPage`, `registrationPage`, and `accountsPage` dependencies.
- **UI tests**: login form, bad credentials, empty credentials, registration navigation.
- **Optional positive login**: set your own demo account credentials in `.env`.
- **Test runner**: Chromium by default; Firefox and WebKit are configured.
- **Reporting**: HTML, screenshots, videos, and traces when tests fail.
- **CI sample**: GitHub Actions smoke checks.
- **TypeScript typecheck**: a separate compiler check catches type errors.

## Requirements

1. Node.js **22 or newer** (`node -v`).
2. Visual Studio Code (recommended).
3. Internet connection to install packages and open the ParaBank demo website.

### Windows PowerShell setup

```powershell
cd path\to\playwright-parabank-pom
node -v
npm -v
npm install
npx playwright install chromium
Copy-Item .env.example .env
npm run typecheck
npm run test:smoke
```

The public ParaBank application is shared and may be slow or temporarily unavailable.
If the site is down, a failed network test does **not** automatically mean the code is wrong.

### Common commands

| Task | Command |
| --- | --- |
| Run Chromium tests | `npm test` |
| Smoke tests only | `npm run test:smoke` |
| All three browsers | `npx playwright install && npm run test:all` |
| Watch the browser | `npm run test:headed` |
| Interactive Playwright UI | `npm run test:ui` |
| Debug step-by-step | `npm run test:debug` |
| Check TypeScript types | `npm run typecheck` |
| Open the HTML report | `npm run test:report` |
| Run one test | `npx playwright test tests/login.spec.ts --project=chromium` |
| Generate selectors | `npx playwright codegen https://parabank.parasoft.com/parabank/index.htm` |

### To test a successful login

1. Register a **disposable test account** at the ParaBank demo website.
2. In your local `.env` file, set:

```dotenv
PARABANK_USERNAME=your_test_username
PARABANK_PASSWORD=your_test_password
```

3. Run `npm test`. Without these variables, the positive login test is skipped.
Never commit your `.env` file or real banking credentials.

## Project layout

```text
playwright-parabank-pom/
├── .github/workflows/playwright.yml   # CI example
├── .vscode/extensions.json             # Editor extensions
├── .env.example                        # Credentials template only
├── fixtures/
│   └── testFixtures.ts                 # Typed page-object fixtures
├── pages/
│   ├── BasePage.ts                     # Shared navigation helper
│   ├── LoginPage.ts                    # Login selectors and actions
│   ├── RegistrationPage.ts             # Registration page selectors
│   └── AccountsPage.ts                 # Post-login checks
├── test-data/
│   └── users.ts                        # Invalid login sample data
├── tests/
│   ├── login.spec.ts                   # Login scenarios
│   └── navigation.spec.ts              # Registration navigation
├── playwright.config.ts                # Browsers, reports, retries, base URL
├── tsconfig.json                       # TypeScript compiler options
└── package.json                        # Packages and commands
```

## Follow the flow of one test

Open `tests/login.spec.ts` and find the `login form is displayed` test:

1. Playwright discovers the test in the `tests` folder.
2. The custom fixture makes a `LoginPage` using the current isolated `page`.
3. `loginPage.open()` navigates to ParaBank.
4. `loginPage.expectLoginFormVisible()` checks the important login elements.
5. Playwright captures a report, and on failure retains trace/video/screenshots.

### POM vs fixtures vs test data

- **Page Object**: *How* to interact with a page (`login`, `open`, `openRegistration`).
- **Test**: *What* behavior to verify (valid/invalid login, visible form).
- **Fixture**: Reusable setup/injection so each test receives page objects.
- **Test data**: Scenario inputs outside of page actions.
- **Config**: Environment, browser matrix, retries, timeouts, and reporting.

## Debugging common issues

- **`node` or `npm` not recognized**: install Node.js 22 LTS and reopen PowerShell or VS Code.
- **Browser executable missing**: run `npx playwright install chromium`.
- **`No tests found`**: run commands from the folder containing `playwright.config.ts`.
- **ParaBank server error**: open the website manually; shared demo availability varies.
- **Locators don't match**: inspect the live page with `npx playwright codegen`.
- **TypeScript errors**: run `npm run typecheck`; don't execute `.ts` with `npx filename.ts`.
- **Flaky website**: review trace, screenshots and video in `test-results/`.

## Good next enhancements

- Positive-login account setup via registration fixture.
- Parameterized credentials and account types.
- Separate API tests using the built-in `request` fixture.
- Reusable authenticated storage state for faster suites (with isolated accounts).
- Data setup and cleanup for transfer/bill-pay tests.
- Test sharding and multiple CI workers **after** tests become parallel-safe.

**Note:** This starter avoids creating or transferring funds on the shared demo server.
