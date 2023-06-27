# FINCORD BACK
About An application made as a project capstone for the "Kampus Merdeka x dicoding Batch 2" activity as a final requirement in the activity assessment

## Features
- [x] Register
- [x] Login
- [x] Logout
- [x] Send Email Verification
- [x] Verify Email

## Show NPM Features
type `npm run' to show command lists

## Standard Procedure For Local Development
1. Clone the repository
```bash
git clone https://github.com/Dzyfhuba/fincord-back.git
```

2. Change directory to the cloned repository
```bash
cd fincord-back
```

3. Install dependencies
```bash
npm install
```

4. Run the application
```bash
npm run start
```

5. Copy .env.example to .env
```bash
cp .env.example .env
```

6. Change .env file to your own
7. Create a database in your own same with .env file
8. Migrate the database
```bash
npm run migrate
```

## Route
Root route is /api
example for register route: /api/register
### /
```
Hello, World!
```
### /register
>POST  
>x-www-form-urlencoded
>```
> {
>   name: String,
>   username: String,
>   email: Email String,
> }
> ```
>Success:
>```json
>{
>    "message": "User created successfully",
>    "username": "your username",
>    "email": "ur@mail.com",
>    "token": "your token"
>}
>```
>Failed 1:
>```json
>{
>    "error": "username or email is already used"
>}
>```

### /login
>POST
>x-www-form-urlencoded
>```
> {
>   email: Email String,
>   password: String
> }
> ```
> or
>```
> {
>   username: String,
>   password: String
> }
> ```
>Success:
>```json
>{
>    "message": "User logged in successfully",
>    "username": "your username",
>    "email": "ur@mail.com",
>    "token": "your token"
>}
>```
>Failed 1:
>```json
>{
>    "message": "User already logged in",
>    "token": "your token"
>}

### /logout:
request header must contain "token".
>Success:
>```json
>{
>    "message": "User logged out successfully"
>}
>```
>Failed 1:
>```json
>{
>    "error": "unauthorized"
>}

### /sendverification
request header must contain "token".
>Success:
>```json
>{
>    "message": "Verification email sent"
>}
>```
>Failed 1:
>```json
>{
>    "error": "unauthorized"
>}
>```
>Failed 2:
>```json
>{
>    "error": "user already verified"
>}

### /verify/:token
this route does not require /api for prefix
this route is only available for unverified user.
>Success:
>```json
>{
>    "message": "User verified"
>}
>```
>Failed 1:
>```json
>{
>    "error": "unauthorized"
>}
>```
>Failed 2:
>```json
>{
>    "error": "user already verified"
>}
    
## Contributors
- [x] [Rahmat Soleh](https://github.com/rahmatsoleh)
- [x] [Hafidz Ubaidillah](https://github.com/Dzyfhuba)
- [x] [Eka Zuni Selviana](https://github.com/Ekazunis)
- [x] [M Ilyas Arman S](https://github.com/milyasarmans)
