
import { __prod__ } from "./constants/constants";
import { MikroORM } from "@mikro-orm/core";
import {Post} from "../src/entities/Post"
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post],
  dbName: "reddit",
  type: "mysql",
  user: "root",
  host: "localhost",
  password: "root",
  
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];