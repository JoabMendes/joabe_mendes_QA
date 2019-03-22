
## Ormuco - Software Developer In Test - Technical Test - Joabe Mendes

[![Build Status](https://travis-ci.com/JoabMendes/joabe_mendes_QA.svg?token=YiXFcShY3q5wCAWymCUr&branch=master)](https://travis-ci.com/JoabMendes/joabe_mendes_QA)

### The chosen framework

The e2e framework I chose to implement my solution was the [angular/protractor](https://github.com/angular/protractor). This framework
was chosen after I inspected the login page that I should test. I used a Google Chrome plugin
called [wappalyze](www.wappalyzer.com), which tells you what fronted technologies are used in a webpage:

![wappalyze ins](https://i.imgur.com/cw81htS.png)

As I saw that [https://uat.ormuco.com/login](https://uat.ormuco.com/login) is using `Angular 1.6.9`, using the angular
native e2e framework seemed to be the best choice. Protractor is a [Node.js](http://nodejs.org/) program built on top 
of [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs). Protractor runs tests against an application 
running in a browser, interacting with it as a real user. It has a special support to test AngularJS/Angular frontends applications
considering these frameworks unique capabilities. 


### The solution

As I never used Protractor before, I read their [Tutorial](http://www.protractortest.org/#/tutorial) page and could find most of
what I needed to create my tests. I created a NodeJs module with `npm init` and installed protractor.

I implemented the test configuration, but my version differs a bit from the default configuration specified in the documentation:

- `test.js` has my module protractor tests configuration, in the tutorial they request you to name it as `conf.js`
- `/tests` this folder has the test specs separated by files. I prefer to separate each test in a unique file since it helps on maintainability.

This solution file tree ended as the following:
```
.
├── README.md
├── node_modules  
├── package-lock.json
├── package.json
├── test.js         # The test configuration file defining the tests scripts
├── test_dev.sh     # The developement environment test script boostrap
└── tests                              # This folder has all the tests separate by file         
    ├── test_login_failure.js          # Tests the default login form submission failure
    └── test_login_failure_locales.js  # Test the login form submission failure for every possible locale in the login page

```

There are two scripts that run the tests in this solution

- `test_login_failure.js`: runs the test for the default login form failure
- `test_login_failure_locales.js` run the test for every existing locale, expecting the login form failure

Both tests follow this routine:

1. Verify if the input with id = 'username' is present
2. Verify if the input with id = 'password' is present
3. Enter an invalid username strong in the username input.
4. Verify if the input with id = 'username' has the previously entered value.
5. Enter an invalid password string in the password input.
6. Verify if the input with id = 'password' has the previously entered value.
7. Click on the form submit button

    7.1 Verify if the form submission failure message is displayed
    
    
In the multi-locale test, the locale switch is select for a language before starting that routine with:

```
for locale in locales:
    1. click on the 'locale dropdown' switch
    2. click on the 'locale' option
    3. wait to locale to be set
    4. verify if the title of the form is in 'locale'
    5. Run form submission routine failure
```

I also added a `.travis.yml` config file to run the tests on [Travis](https://travis-ci.com/), 
which has nice features for continuous integration. 

*The travis badge might display 
failure if the login page displays the 'maintenance' status. This status changes 
the form submit button behaviour, making the tests fail*.

### Requirements

- Unix environment
- Node.js and npm:
    If you are running tests in you local environment, you will need Node.js and npm installed in you machine.
    Check how to install them on:: https://www.npmjs.com/get-npm
- The last stable version of Google Chrome.

### Install

Install the project dependencies with:
```sh
$ npm install
```

### Running the tests

I created a special bash script that runs the web-driver plugin in the background and triggers the tests specified
in the `test.js` file:

```bash
$ ./test_dev.sh
```

The tests are run in the Google Chrome browser in a headless configuration. You can change that by modifying the
`multiCapabilities` option in the `test.js` file. For example, if you want to add Firefox testing, just add this 
option into the array:
```javascript
  {
      browserName: 'firefox',
      firefoxOptions: {
                args: ['--headless']
      },
      'moz:firefoxOptions': {
      args: ['--headless']
     }
  }
```