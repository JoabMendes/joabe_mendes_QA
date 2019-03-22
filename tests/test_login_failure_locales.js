LOGIN_URL = 'https://uat.ormuco.com/login';
USER_NAME = 'wrong_username';
PASSWORD = 'wrong_password';


LOCALES = ['FR', 'PT', 'ES', 'RU', 'JA'];

LOCALES_SELECTORS = {
    'EN': 'English',
    'FR': 'Français',
    'PT': 'Português',
    'ES': 'Español',
    'RU': 'Русский',
    'JA': '日本語'
};

LOCALES_TITLES = {
    'EN': 'Sign in to your cloud portal',
    'FR': 'Connectez-vous à votre portail cloud',
    'PT': 'Entrar no seu portal nuvem',
    'ES': 'Inicia sesión en tu portal de la nube',
    'RU': 'Войти на облачный портал',
    'JA': 'あなたのクラウドポータルにサインインする'
};

LOCALES_FAILURE_FEEDBACK = {
    'EN': 'The user or password is incorrect.',
    'FR': 'L\'identifiant ou le mot de passe est erroné.',
    'PT': 'Senha ou usuário incorreto.',
    'ES': 'El usuario o contraseña son incorrectos.',
    'RU': 'Неверное имя пользователя или пароль.',
    'JA': 'ユーザーまたはパスワードが間違っています。'
};

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

    // Test for every existing locale
    for (let locale of LOCALES) {
        // Fill the form with a invalid credential an expect an error message
        it('login form should fail with wrong credentials', function () {

            // Switch the locale to french
            let dropdown = element(by.css('.lang_menu'));
            // Click on locale dropdown
            dropdown.click().then(function () {
                browser.waitForAngular();
                let locale_selector = dropdown.element(by.cssContainingText(
                    '.lang_name', LOCALES_SELECTORS[locale])
                );
                // Click on specified locale
                locale_selector.click().then(function () {
                    // browser.waitForAngular();
                    let title = element(
                        by.css('[translate="SIGN IN PORTAL"]')
                    );
                    browser.wait(
                        protractor.ExpectedConditions.textToBePresentInElement(
                            title, LOCALES_TITLES[locale]
                        ),
                        6000
                    );
                    // Verify if locale was changed to french
                    expect(
                        element(
                            by.css('[translate="SIGN IN PORTAL"]')
                        ).getText()
                    ).toEqual(LOCALES_TITLES[locale]);

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
                            by.cssContainingText(
                                '.warning', LOCALES_FAILURE_FEEDBACK[locale]
                            )).isPresent()
                        ).toBe(true);
                        // Verify the message of the warning span is correct
                        let warning_span = element(by.cssContainingText(
                            '.warning', LOCALES_FAILURE_FEEDBACK[locale]));
                        expect(warning_span.getText()).toEqual(
                            LOCALES_FAILURE_FEEDBACK[locale]
                        );
                    }, 10000);
                }, 10000);
            }, 10000);

        });
    }

});