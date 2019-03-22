LOGIN_URL = 'https://uat.ormuco.com/login';
USER_NAME = 'wrong_username';
PASSWORD = 'wrong_password';

WRONG_LOGIN_FEEDBACK_MESSAGE = 'The user or password is incorrect.';

describe('Test Ormuco Login Failure:', function () {

    beforeEach(function () {
        browser.get(LOGIN_URL);
        browser.waitForAngular();
    }, 30000);

    // First let's verify if the login page loaded and the form is displayed
    it('should have the login form', function () {
        // Verify if the username input exists
        expect(element(by.id('username')).isPresent()).toBe(true);

        // Verify if the password input exists
        expect(element(by.id('password')).isPresent()).toBe(true);

        // Verify if the submit button exists
        expect(element(by.css('.button-login')).isPresent()).toBe(true);
    });

    // English locale test

    // Fill the form with a invalid credential an expect an error message
    it('login form should fail with wrong credentials', function () {

        // Get the username field and set a value
        let username = browser.findElement(by.id('username'));
        username.sendKeys(USER_NAME);
        expect(username.getAttribute('value')).toEqual(USER_NAME);

        // Get the password field and set a value
        let password = browser.findElement(by.id('password'));
        password.sendKeys(PASSWORD);
        expect(password.getAttribute('value')).toEqual(PASSWORD);

        // Get the submit button and submit it
        let submit_button = element(
            by.css('[ng-click="login(username, password)"]')
        );
        submit_button.click().then(function () {
            browser.waitForAngular();
            // Verify if the warning span is present
            expect(element(
                by.binding('error.message')).isPresent()
            ).toBe(true);
            // Verify the message of the warning span is correct
            let warning_span = element(by.binding('error.message'));
            expect(warning_span.getText()).toEqual(
                WRONG_LOGIN_FEEDBACK_MESSAGE
            );
        }, 10000);

    });

});