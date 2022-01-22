# Yayis-Api

## Features

- lists CRUD
- todos CRUD
- Get app themes
- Get app languages
- User management
  - Login
  - Registration
  - Update configuration
  - Reset password

## Pending

- Users controller
  - POST reset pwd endpoint
- implement js-validation-tool
- validate user on
  - delete/patch theme
  - delete/patch language
  - delete/patch another user

## To Be Defined

- Forgot password process
- refresh tokens?

## Low priority issues

- eslint (warning ES modules)

## Testing

- lists controller
  - GET
    - negative scenarios
  - POST
  - PATCH
  - DELETE
  - GET by id
- users controller
  - get
  - post
  - delete
  - patch
  - login
  - reset pwd
- languages controller
  - POST
  - GET
  - DELETE
  - PATCH
  - GET by id
- themes controller
  - POST
  - GET
  - PATCH
  - GET by id

### Unit

- Controller methods (easy pz)

### Integration

- Controllers only
