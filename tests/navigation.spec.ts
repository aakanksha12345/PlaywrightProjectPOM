import { test } from '../fixtures/testFixtures';

test('customer can navigate to registration form @smoke', async ({ loginPage, registrationPage }) => {
  await loginPage.open();
  await loginPage.openRegistration();
  await registrationPage.expectRegistrationFormVisible();
});
