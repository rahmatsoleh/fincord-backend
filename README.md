# FINCORD BACK
About An application made as a project capstone for the "Kampus Merdeka x dicoding Batch 2" activity as a final requirement in the activity assessment

## Features
- [ ] Register

## Installation
1. Clone the repository
```bash
git clone [https://github.com/rahmatsoleh/fincord.git](https://github.com/Dzyfhuba/fincord-back.git)
```

2. Change directory to the cloned repository
```bash
cd fincord-BACK
```

3. Install dependencies
```bash
npm install
```

4. Run the application
```bash
npm run start
```

## Route
Root route is /api
example for register route: /api/register
### /
```json
Hello, World!
```
### /register
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
>Success:
>```json
>{
    
    
## Contributors
- [x] [Rahmat Soleh](https://github.com/rahmatsoleh)
- [x] [Hafidz Ubaidillah](https://github.com/Dzyfhuba)
- [x] [Eka Zuni Selviana](https://github.com/Ekazunis)
- [x] [M Ilyas Arman S](https://github.com/milyasarmans)
