#!/usr/bin/env bash


if [ -d node_modules ]   # for file "if [-f /home/rama/file]"
then
    echo "=========== Updating the Webdrive manager =============="
    webdriver-manager update
    echo "=========== Running the webdriver in the background =============="
    webdriver-manager start & sleep 3
    echo "============ Running Tests ============="
    protractor test.js
else
    echo "==================================================="
    echo "Ops! It seems you forgot to install the project dependencies"
    echo "Please run the following command:"
    echo ""
    echo "$ npm install"
    echo ""
    echo "If you don't have Node.js and npm check how to install them on:"
    echo ""
    echo "https://www.npmjs.com/get-npm"
    echo ""
    echo "==================================================="
fi


