// tests/addUser.spec.js
const { test } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const data = require('../data/users.json');
const { UserPage } = require('./pageObjects/UserPage');

test('Add multiple users', async ({ page }) => {
  const userPage = new UserPage(page);
  // Navigate to the add users form
  await userPage.navigate();
  // loop to add multiple users from users.json file
  for (const user of data) {
    const fakeUsername = faker.internet.username();
    // click on Add user button to add new user
    await userPage.openAddUserForm();
    // Insert users from the data sheet
    await userPage.fillUserForm({ ...user, UserName: fakeUsername });
    // Click on Save button to save the user
    await userPage.saveUser();
    // Verify is the user is created
    await userPage.verifyUserInTable(user.FirstName, user.LastName, fakeUsername);
  }
});
