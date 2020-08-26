import { Resolver, Query, Ctx } from "type-graphql";
import { Post } from "../entities/Post";
import {MyContext} from "types";

@Resolver()
export class PostsResolver {
  @Query(() => [Post])
  posts(
      @Ctx() {em}: MyContext
  ) {
    return em.find(Post, {});
  }
}