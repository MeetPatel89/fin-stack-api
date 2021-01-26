# Fin-Stack (Server)
App Live at https://fin-stack-client.vercel.app

Backend server hosted at https://still-temple-55104.herokuapp.com/

### Table of Contents
- [Description](#description)
- [API endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)

## Description

This is the backend server sustaining the live frontend app linked above.

## API endpoints

- For accessing accounts:
    
    - GET /api/accounts/:userId
    - POST /api/accounts/:userId

- For accessing categories:

    - GET /api/categories/:userId
    - POST /api/categories/:userId

- For accessing transactions:

    - GET /api/transactions
    - GET /api/transactions/:userId
    - POST /api/transactions/:userId
    - DELETE /api/transactions/:id
    - PATCH /api/transactions/:id

- For accessing users:

    - GET /api/users
    - GET /api/users/:username
    - POST /api/users

## Tech Stack

### FrontEnd

- JS/ES6
- React
- React-router
- CSS3
- HTML5

### BackEnd
- NodeJS
- Express
- Knex
- CORS
- Chai, Mocha, supertest (testing)

### Database
- PostgreSQL