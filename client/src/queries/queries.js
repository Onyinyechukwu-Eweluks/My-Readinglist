import { gql } from "@apollo/client";

export const getAuthorsQuery = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

export const getBookQuery = gql`
  query ($id: ID) {
    book(id: $id) {
      name
      genre
      id
      author {
        name
        books {
          name
          genre
        }
      }
    }
  }
`;

export const addBookQuery = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
