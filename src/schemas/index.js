import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type User {
    id: ID
    email: String
    fname: String
    lname: String
    role: String
  }

  type Post {
    id: ID
    title: String
    user_id: String
    user: User
    description: String
    comments: [Comment]
  }

  type Comment {
    id: ID
    user_id: String
    post_id: String
    user: User
    post: Post
    text: String
  }

  type Token {
    token: String
  }

  type Query {
    getPosts(user_id: ID): [Post]
    getCurrentUser: User
    getPostComments(post_id: ID!): [Comment]
  }

  type Mutation {
    login(email: String!, password: String!): Token
    addPost(title: String!, description: String): Post
    addComment(text: String!, post_id: ID!): Comment
    deletePost(id: ID!): Boolean
    deleteComment(id: ID!): Boolean
  }
`);

export default schema;