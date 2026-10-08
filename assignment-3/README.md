# Assignment 3: JavaScript DOM / Event Listeners

User registration form with live validation, using plain HTML, CSS and JavaScript. No install needed.

## Run

Open `index.html` in any browser (double-click it).

## What it does

- Fields: Name, Email, Phone, Password.
- Each field is validated on every `input` event with a RegEx, and the border turns red (`invalid`) or green (`valid`).
- Error text is shown under the field. A `submit` listener calls `preventDefault()`, re-checks all fields and shows "Registration successful!" only if all pass.

| Field | Rule |
|---|---|
| Name | Letters only, at least 3 characters |
| Email | Standard `user@domain.tld` format |
| Phone | Exactly 10 digits |
| Password | At least 8 characters with a lowercase letter, an uppercase letter and a digit |

## Files

- `index.html`: markup, styles and script in one file.
