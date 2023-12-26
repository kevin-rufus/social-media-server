import { allow, rule } from 'graphql-shield'

export const isAuthenticated = rule()(async (parent, args, {user}, info) => {
  const userId = user?.id;
  return userId !== null && userId !== undefined;
})

export const isAdmin = rule()(async (parent, args, {user}, info) => {
  return user?.role === "admin";
})


export const isUser = rule()(async (parent, args, {user}, info) => {
  return user?.role === "user";
})

export const allowAll = allow;