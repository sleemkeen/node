import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";
import { User } from "../entities/User";
import {MyContext} from "types";
import {RegisterInputs} from './fields/registerInputs';
import {authInputs,UserResponse } from './fields/authInputs';

import argon2 from "argon2";


@Resolver()
export class UsersResolver {

// Fetch all users
  @Query(() => [User])
  users(@Ctx() {em}: MyContext): Promise<User[]> {
    return em.find(User, {});
  }


  //Fetch users by ID
  @Query(() => User, {nullable: true})
  user
  (
    @Arg('id', () => Int) id: number,
    @Ctx() {em}: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { id });
  }

  //Register Users
  @Mutation(() => UserResponse) 
  async register(
    @Arg("options") options: RegisterInputs,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {

    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    //check if username already exist

    const ifUsernameExist = await em.findOne(User, { username: options.username });
    
    if(ifUsernameExist){
    return {
        errors: [
            {
            field: "username",
            message: "Username already exist",
            },
        ],
        };
    }


    const hashPassword = await argon2.hash(options.password);
    const user = em.create(User, { 
        username: options.username,
        lastname: options.lastname,
        firstname: options.firstname,
        password: hashPassword
     });
    await em.persistAndFlush(user);
    return {user};
  }


  @Mutation(() => UserResponse) 
  async login(
    @Arg("options") options: authInputs,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "that username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    return {
      user,
    };
  }


  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id") id: number,
    @Arg("firstname", () => String, { nullable: true }) firstname: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (typeof firstname !== "undefined") {
      user.firstname = firstname;
      await em.persistAndFlush(user);
    }
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(User, { id });
    return true;
  }
}

