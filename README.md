# Portfolio starter biekeb

Brief description of your project.

## Purpose

This API is written in JavaScript and is intended as an assignment for my college degree.

## API Endpoints
### Users
- **'GET /users'**: Get a list of all users.
- **'GET /users/:id'**: Get a list of the user id.
- **'POST /users'**: Create a new user.
+ Request body:
    {
        "username": "JohnDoe"
        "email": "johndoe@email.com",
        "age": 26,
        "password": "SecretPassword123"
    }
- **'PUT /users'**: Edit the user.
+ Request body:
    {
        "username": "JohnDoe"
        "email": "johndoe@email.com"
    }
- **'DELETE /users/{id}'**: Delete a user by its id.


## Installation

To get started with the project, follow these steps:

1. Copy the `.env.template` file and rename it to `.env`.
2. Run the following command to build and start the project:

```bash
docker-compose up --build
```
## Status
The current status of this project is "in development". 

## Questions and support
If you have any questions or need help, please reach out! Feel free to open a support ticket.

## License
This project is licensed under the [MIT License] (LICENSE).


