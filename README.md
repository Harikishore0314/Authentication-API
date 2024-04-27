# Authentication-API
 Authentication apis using express and MongoDB as databases (login, signup, user details)

 Click Here to Access the Assessment ([Live Link](https://authentication-api-1.onrender.com/))

 
## Login: /user/login 
-> Allows users to login using email and the password.

body: {
 "email": "example@email.com",
 "password": "password"
}

## Signup: /user/signup
-> Allows users to signup using username, email and password.

body: {
  "username": "username"
  "email": "example@email.com",
 "password": "password"
}

## User Details: /user/user-details   ([Get User Details](https://authentication-api-1.onrender.com/user/user-details))
-> Allows user can retrieve all users details, returns the list of availabe users.

