Node, Express, GraphQl, Mikro Orm

# Write your query or mutation here

//query post

{
  posts{
    id
    title
  }
}

//fetch post by 1d

{
  post(id: 2){
    id
    title
  }
}

//Create post Mutations

mutation{
  createPost(title: "Graph ql"){
    id
    title
  }
}
//update posts

mutation{
  updatePost(id: 2, title: "we are here"){
    id
    title
  }
}

//delete posts

mutation{
  deletePost(id: 7)
}


//register

mutation{
  register(options: {
    username: "sleemkeen",
    password: "howareyou",
    firstname: "Haruna",
    lastname: "ahmadu"
    
  }){
    errors{
      field
      message
    }
    user{
      id
      firstname
      lastname
    }
    
    
  }
}

//login

mutation{
  login(options: {
    username: "sleemkeen",
    password: "howareyou"
  }){
    errors{
      field
      message
    }
    user{
      id
      firstname
      lastname
    }
    
    
  }
}