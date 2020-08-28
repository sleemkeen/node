import { MikroORM } from "@mikro-orm/core";
import microConfig from './mikro-orm.config'
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostsResolver } from "./resolvers/posts";
import {UsersResolver} from "./resolvers/users"


const main = async () => {
    const orm = await MikroORM.init(microConfig);
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
          resolvers: [HelloResolver, PostsResolver, UsersResolver],
          validate: false,
        }),
        context: () => ({ em: orm.em})
    });
    
    apolloServer.applyMiddleware({ app });

    app.get('/', (req, res) => {
        res.send('Api testing')
    });
      

    app.listen(5000, () => {
      console.log("server started on localhost:5000");
    });
  };
  
  main();