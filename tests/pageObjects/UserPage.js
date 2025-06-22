// PageObjects/UserPage.js
const { expect } = require('@playwright/test');

class UserPage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('http://www.way2automation.com/angularjs-protractor/webtables/');
        await expect(this.page.getByRole('textbox', { name: 'Search' })).toBeVisible();
    }

    async openAddUserForm() {
        await this.page.getByRole('button', { name: 'Add User' }).click();
        await expect(this.page.getByRole('heading', { name: 'Add User' })).toBeVisible();
    }

    async fillUserForm(user) {
        await this.page.locator('input[name="FirstName"]').fill(user.FirstName);
        await this.page.locator('input[name="LastName"]').fill(user.LastName);
        await this.page.locator('input[name="UserName"]').fill(user.UserName);
        await this.page.locator('input[name="Password"]').fill(user.Password);

        await this.page.getByLabel(user.Customer).check();
        await this.page.locator('select[name="RoleId"]').selectOption({ label: user.Role });
        await this.page.locator('input[name="Email"]').fill(user.Email);
        await this.page.locator('input[name="Mobilephone"]').fill(user.CellPhone);
    }

    async saveUser() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async verifyUserInTable(firstName, lastName, userName) {
        const table = this.page.locator('tbody');
        await expect(table).toContainText(firstName);
        await expect(table).toContainText(lastName);
        await expect(table).toContainText(userName);
    }
}

module.exports = { UserPage };
