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

//Defining our object type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        // console.log(parent);
        // return _.find(authors, { id: parent.authorId });
        let authors = await Authors.findById({ _id: parent.authorId });
        return authors;
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // console.log(parent);
        // return _.filter(books, { authorId: parent.id });
        let books = await Books.find({ authorId: parent._id });
        return books;
      },
    },
  }),
});

module.exports = { BookType, AuthorType };
