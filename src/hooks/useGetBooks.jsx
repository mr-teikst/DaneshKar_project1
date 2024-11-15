import React, { useContext, useEffect } from "react";
import { getData } from "../services/api";
import { BookContext } from "../contexts/BookContext";

const useGetBooks = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("/api/books");
        console.log(data.data);
        setBookList(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error(err);
        setBookList([]);
      }
    };
    fetchData();
  });
};

export const getBooks = () => useGetBooks();
