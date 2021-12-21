# Yayis-Api

## Features

- CRUD for lists, users
- Get available themes for todo app
- Get available languages for app
- Login
- User registration

## Todos

### Prioritary

- update lists controller
  - lists belongs to users
- todos controller
  - post
  - patch
  - delete

### Secondary

- implement js-validation-tool
- research about refresh tokens
- Users controller
  - reset pwd
  - patch
- define how to recover your account once removed(disabled)
- Define how local data would sync (Controller for bulk support?)
  - post
  - put

### Low priority

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

- Model layer

## Features

Validate user to delete actions (languages, themes, users, lists)
