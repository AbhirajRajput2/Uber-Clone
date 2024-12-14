# User Registration API

## Endpoint: `/users/register`

This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JWT token for authentication.

### Request Method:
- **POST**

### Request Body:

- **fullname** (Object): Contains the user's full name.
  - **firstname** (String): User's first name (Minimum length: 3 characters)
  - **lastname** (String): User's last name (Minimum length: 3 characters)
- **email** (String): User's email address (Must be a valid email format).
- **password** (String): User's password (Minimum length: 6 characters).

### Validation Rules:
- **firstname** (String): User's first name (Minimum length: 3 characters)
- **lastname** (String): User's last name (Minimum length: 3 characters)
- **email** (String): Must be a valid email format (e.g., `user@example.com`)
- **password** (String): Minimum length of 6 characters.

### Response:

- **Response Body**:
  - **status** (String): A message indicating the success of the registration
  - **token** (String): The generated JWT token for authentication.
  - **user** (Object): Contains the details of the registered user:
    - **fullname** (Object): The user's full name.
      - **firstname** (String): The user's first name.
      - **lastname** (String): The user's last name.
    - **email** (String): The user's email address.
    - **socketId** (String|null): The user's socket ID (null initially).


# User Login API

**Endpoint**: `/users/login`

This endpoint is used to log in an existing user. It validates the input data, checks the email and password against the database, and returns a JWT token for authentication if the credentials are valid.

## Request Method:
**POST**

## Request Body:
-**email** (String): User's email address (Must be a valid email format).
-**password** (String): User's password (Minimum length: 6 characters).

### Validation Rules:
- **email** (String): Must be a valid email format (e.g., `user@example.com`).
- **password** (String): Minimum length of 6 characters.

## Response:

- **Response Body**:
  - **status** (String): A message indicating the success of the registration
  - **token** (String): The generated JWT token for authentication.
  - **user** (Object): Contains the details of the registered user:
    - **fullname** (Object): The user's full name.
      - **firstname** (String): The user's first name.
      - **lastname** (String): The user's last name.
    - **email** (String): The user's email address.
    - **socketId** (String|null): The user's socket ID (null initially).