# Social Media API (GraphQL) Documentation

This documentation provides an overview of the Social Media API, a GraphQL-based server for managing users, posts, and comments.

## Models

The API includes the following models:

1. **User**
   - Represents a user in the system.

2. **Post**
   - Represents a post made by a user.

3. **Comment**
   - Represents a comment made on a specific post.

## Authentication

Authentication is implemented using JSON Web Tokens (JWT). Only authenticated users have the privilege to perform certain operations.

## Queries and Mutations

The API supports the following queries and mutations:

### Queries

1. **Get Currently Authenticated User:**
   - Fetch information about the currently authenticated user.

2. **List Posts with Filtering:**
   - Retrieve a list of posts with the option to filter by user ID.

3. **List Comments for a Post:**
   - Fetch a list of comments for a specific post.

### Mutations

1. **Login**
  - Allow users to get authenticate and fetch a JWT token.

2. **Add New Post:**
   - Allow authenticated users to add a new post.

3. **Add New Comment:**
   - Enable authenticated users to add a new comment to a post.

4. **Delete Post:**
   - Enable authenticated admin users to delete an existing post.

5. **Delete Comment:**
   - Enable authenticated admin users to delete an existing comment.

## Authorization

Authorization is implemented to control access to critical functionalities. Only users with the role of administrator can delete posts or comments.

## Important Information

- To set up the database and add default users, run: `npm run seed`.
  - Default users created:
    - `admin:admin` with the role `admin`.
    - `test:test` with the role `user`.
    - `user:password` with the role `user`.
## Running Everything

1. Run `npm i` in the root directory.
2. Run `npm run start:dev` in the root directory.

After that, you can visit http://localhost:3000/graphql to access the GraphQL server.

## Directory Structure

This is an NPM monorepo, and the structure is as follows:

1. `src` directory contains all the app-related code.
   - `middleware` stores the middlewares.
   - `models` stores the models.
   - `permissions` stores the queries and mutations authorization logic.
   - `resolvers` contains all the resolvers.
   - `schemas` contains the GraphQL schemas.
   - `services` contains the application services (e.g., database, s3, etc.).
   - `utils` stores the utilities of the application.
2. `scripts` directory contains the script to populate data.
