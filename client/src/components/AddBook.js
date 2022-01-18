import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookQuery,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const [book, setBook] = useState({ name: "", genre: "", authorId: "" });

  const { data, loading, error } = useQuery(getAuthorsQuery);
  //console.log("authorQuery:", authorQuery);

  const [addBook] = useMutation(addBookQuery);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  //console.log("Query:", data);
  //console.log("book: ", book);

  return (
    <div>
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            name="name"
            defaultValue={book.name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            defaultValue={book.genre}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Author:</label>

          <select
            name="authorId"
            defaultValue={book.authorId}
            onChange={handleChange}
          >
            <option>Select author</option>
            {loading ? (
              <option>Loading...</option>
            ) : error ? (
              <option>Error :{error.message}</option>
            ) : (
              data.authors.map((author) => (
                <option value={author.id} key={author.id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        </div>
        <button>+</button>
      </form>
    </div>
  );
}

export default AddBook;
