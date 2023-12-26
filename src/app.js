import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './schemas/index.js';
import resolvers from './resolvers/index.js';
import {attachSequelize} from './middleware/db.js';
import { attachSession } from './middleware/auth.js';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './permissions/index.js';
import { makeExecutableSchema } from '@graphql-tools/schema';

const app = express();
app.use(attachSequelize);
app.use(attachSession);

const schema = makeExecutableSchema({typeDefs, resolvers});
const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  resolvers,
  context: ({ req }) => {
    // Access the authenticated user from the request object
    
    const user = req.session?.user || {};
    return { user };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});