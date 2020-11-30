const axios =require("axios")
const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({secret:"fnAD7pdtbRACAaxjT4Om2JdGbwKQch3pWiG9N2P9"})
const shortid = require('shortid')
const typeDefs = gql`
  type Query {
    getAllLollies: [Lolly!]
    getLollyByPath(lollyPath:String):Lolly
  }
  type Lolly {  
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }
  type Mutation{
    createLolly(
      recipientName: String! ,
      message: String!, 
      senderName: String!,
      flavourTop: String!,
      flavourMiddle: String!,
      flavourBottom: String!,
      lollyPath:String!
      ):Lolly
  }
`
const resolvers = {
  Query: {
    getAllLollies: async() => {
      var results = await client.query(
           q.Map(
          q.Paginate(q.Documents(q.Collection("Lolly"))),
          q.Lambda(x => q.Get(x))
        ))
      return results.data.map((res)=>{
        return{
          recipientName: res.data.recipientName,
          message: res.data.message,
          senderName: res.data.senderName,
          flavourTop: res.data.flavourTop,
          flavourMiddle: res.data.flavourMiddle,
          flavourBottom: res.data.flavourBottom,
          lollyPath: res.data.lollyPath,
        }
      })
    },
    getLollyByPath: async (_, { lollyPath }) => {
      try {
       
        var result = await client.query(
          q.Get(q.Match(q.Index("lolly_by_path"), lollyPath))
        )
        return result.data
      } catch (e) {
        return e.toString()
      }
    },
  },
  
  Mutation: {
    createLolly: async(_,args)=>{
      
    
      const results = await client.query(
        q.Create(q.Collection("Lolly"),{data:args})
      )
      axios
        .post("https://api.netlify.com/build_hooks/5fc54a1a0d7a9d2ac1c1ba3f")
      return results.data
  }
}}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
