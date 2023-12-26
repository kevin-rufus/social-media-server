import { shield } from 'graphql-shield';
import * as rules from './rules.js';

export const permissions = shield({
  Query: {
    "*": rules.allowAll,
    getCurrentUser: rules.isAuthenticated
  },
  Mutation: {
    "*": rules.isAuthenticated,
    login: rules.allowAll,
    deletePost: rules.isAdmin,
    deleteComment: rules.isAdmin,
  },
  Post: {
    "*": rules.allowAll
  },
  User: {
    "*": rules.allowAll
  },
  Comment: {
    "*": rules.allowAll
  },
}, {
  allowExternalErrors: true
});