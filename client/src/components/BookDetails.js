import React from "react";
import { getBookQuery } from "../queries/queries";
import { useQuery } from "@apollo/client";

function BookDetails({ bookId }) {
  const { data, loading } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });
  //console.log("data:", data);

  return (
    <div id="book-details">
      <h1>Book Details</h1>

      {loading ? (
        <p>Loading</p>
      ) : !data ? (
        <p>No book found</p>
      ) : (
        <>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {data.book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default BookDetails;
