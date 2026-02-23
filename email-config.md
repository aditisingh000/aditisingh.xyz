# Email Gate & Viewing Collected Emails

Visitors must enter their email to access your site. Emails are sent to **Formspree** so you can view them in one place.

## 1. Get your Formspree form ID

1. Go to [https://formspree.io/](https://formspree.io/) and sign up (free).
2. Click **New form** and name it (e.g. “aditisingh.xyz gate”).
3. Copy the form ID from the endpoint, e.g. `https://formspree.io/f/xyzabcde` → the ID is `xyzabcde`.

## 2. Add the form ID to your site

In **script.js**, replace the placeholder with your form ID:

```javascript
const FORMSPREE_GATE_ID = 'xyzabcde';  // your actual form ID
```

## 3. View collected emails

- Log in at [https://formspree.io/](https://formspree.io/).
- Open your form and check the **Submissions** tab.
- Each submission includes the email and timestamp. You can also turn on **Email notifications** in Formspree so you get an email for each new submission.

## 4. Optional: export emails

In the Formspree dashboard you can export submissions (e.g. CSV) for use in a spreadsheet or mailing tool.

## Note

Access is stored in **sessionStorage** (per browser tab). Closing the tab means the visitor will see the email gate again next time. To keep them “logged in” across sessions, you could switch to `localStorage` in `script.js` (e.g. use `localStorage.setItem('emailGatePassed', '1')` and `localStorage.getItem('emailGatePassed')`).
