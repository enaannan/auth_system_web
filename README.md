# Auth System

## Overview

An authentication web application built with React(Typescipt), Tailwind CSS, Formik for form handling and Material UI for components.


### Instructions for Setup

Prerequisites

* Node.js (v22+ recommended)
* Yarn

Steps to Run Locally

1. Clone the Repository:

```
git clone https://github.com/enaannan/auth_system_web.git

cd auth_system_web
```

2. Install Dependencies:

``` yarn ```

3. Set Up Environment variables:

Create a `.env` file in the root directory and add the following:
`REACT_APP_API_BASE_URL=http://127.0.0.1:8000`

4. Run the Development Server:
`yarn start`

5. Build the Project:
`yarn build`

### Hosted Links

* Frontend : https://auth-system-web.vercel.app/login

* Backend : https://auth-system-api-phbv.onrender.com

Authentication Flow

1. User Login:

    * The user submits login credentials. ie email & password view the login form
    * The credentials are sent to the backend for validation.
    * On success, the backend returns an access token and a refresh token.
    * Tokens are securely stored in HTTP-only cookies.
    * The user is redireced to the profile page when the login is successful

2. Accessing Protected Routes:

    * When making API requests, the aceess token is included in every request's Authorization header via the axios's response interceptor
    * If the acess token expires, the interceptor catches the 401 error.
    * A request is then sent to the backend to refresh the access tokens using the securly stored refresh tokens.
    * If the refresh token is invalid or expired, the user is logged out and redirected to the login page.
    * A user attempting to directly access the Profile route without valid access tokens will be redirect to the login page.

3. Logout Process:

    * The user can manually log out view the logout button on the profile page
    * The logout clear the cookies and redirects the user to the login page


