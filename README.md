# OK Tools

This is my personal set of various JS tools I use in my projects. Zero dependencies.

Feel free to use them, but please keep in mind that I guarantee nothing.

## Install

Via NPM: `npm install ok-tools`

For Angular, there is `ok-angular-tools` package wrapping these into handy pipes or directives.

## Contents

- **factory** and some misc functions - for normalizing and transforming data, usually coming from API
- **delay** - setTimeout, but like a Promise: `await delay(1000)`
- **formatFileSize** - change number value in bytes to human-readable string like "100 kB"
- **nl2br** - Change newlines into `<br />` while optionally removing all other markup
- **numberFormat** - PHP-like number formatter
- **opening hours** - set of functions to represent, display and query opening hours of some store or institution in a week
- **paginatorSequence** - to make a human-friendly paginationg sequences even for thousands of pages
- **parseTime** - parsing various inputs into standard JS Date object
- **phoneNumberFormatter** - transforms phone numbers into various formats
- **pluralize** - quick-and-dirty pluralization, made for Czech grammar rules (different tenses for 1, 2-4 and 5)
- **random-string** - naive creating a random string
- **range** - create numerical range with various formats
- **relativeTime** - formats a Date as a relative time (like "3 hours ago"), bundled with Czech texts
- **shorten** - truncate a string while keeping words intact
- **specChars** - replace HTML chars with their entities
- **stripTags** - remove HTML chars
- **url-creator** - transforming some object with an ID into an URL
- **urls** - normalizing human-input URL to technical form and vice versa
- **web-address-formatter** - human-readable formatting an URL
