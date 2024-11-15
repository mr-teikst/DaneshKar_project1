import React, { createContext, useContext, useState } from "react";

// Create a Context
const BookContext = createContext();

function BookProvider({ children }) {
  const [bookList, setBookList] = useState([]);

  return (
    <BookContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BookContext.Provider>
  );
}

export {BookContext, BookProvider};
