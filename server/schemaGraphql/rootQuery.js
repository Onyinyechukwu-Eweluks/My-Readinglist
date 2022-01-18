const graphql = require("graphql");
const _ = require("lodash");
const Authors = require("../models/authors");
const Books = require("../models/books");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const { BookType, AuthorType } = require("./typeDefiniton");
const { Mutation } = require("../routes/books");

//Defining how we initially jump into the graph i.e the root
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        //code to get data from db/other source
        // return _.find(books, { id: args.id });
        let book = await Books.findById({ _id: args.id });
        return book;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        let author = await Authors.findById({ _id: args.id });
        return author;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return books;
        let allBooks = await Books.find();
        return allBooks;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        // return authors;
        let allAuthors = await Authors.find();
        return allAuthors;
      },
    },
  },
});

//Defining the schema, passing it some options to define which query d user needs and exporting it
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
