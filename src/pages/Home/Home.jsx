import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { Card } from "../../components/ui/card";
import { getData } from "../../services/api";
import BookItem from "../../components/BookItem/BookItem";
import { Button } from "../../components/ui/button";
import AddBookForm from "../../components/Forms/AddBookForm";
import { BookContext } from "../../contexts/BookContext";
import { getBooks } from "../../hooks/useGetBooks";
const Home = () => {
  // const getBook = useGetBooks;
  const { bookList, setBookList } = useContext(BookContext);
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

    // No cleanup function is returned here, so React won't expect one
  }, []);
  return (
    <div className={styles.full_screen}>
      <Card className={styles.card_style}>
        <div className="mt-4">
          <AddBookForm />
        </div>
        {bookList.map((book) => {
          return <BookItem data={book} />;
        })}
      </Card>
    </div>
  );
};

export default Home;
