import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);
  //   console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      {data.books.map((book) => (
        <ul id="book-list" key={book.id}>
          <li onClick={(e) => setSelected(book.id)}>{book.name}</li>
        </ul>
      ))}
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
