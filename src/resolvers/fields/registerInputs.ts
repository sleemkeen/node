import { InputType,Field } from "type-graphql";

@InputType()
  export class RegisterInputs {
      @Field(() => String)
      username: string
      @Field()
      password: string
      @Field(() => String)
      firstname: string
      @Field(() => String)
      lastname: string
      
  }