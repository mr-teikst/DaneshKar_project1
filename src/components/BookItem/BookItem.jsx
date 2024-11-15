import React, { useContext } from "react";
import styles from "./BookItem.module.scss";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { deleteData, getData } from "../../services/api";
import { BookContext } from "../../contexts/BookContext";
import { toast } from "react-toastify";
import EditBookForm from "../Forms/EditBookForm";

const BookItem = ({ data }) => {
  const { bookList, setBookList } = useContext(BookContext);
  const handleDelete = async (id) => {
    deleteData(`/api/books/${id}`)
      .then(() => {
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
        toast.success(`Book ${id} deleted`);
      })
      .catch(() => {
        toast.error("Failed to delete book");
      });
  };
  return (
    <div className={styles.item_box}>
      <div className={styles.item_detail_box}>
        {data?.title && <Label>Title: {data?.title}</Label>}
        {data?.author && <Label>Author: {data?.author}</Label>}
        {data?.isbn && <Label>ISBN: {data?.isbn}</Label>}
        {data?.publicationYear && (
          <Label>PublicationYear: {data?.publicationYear}</Label>
        )}
      </div>
      <div className={styles.item_btn_box}>
        <Button onClick={() => handleDelete(data._id)} className={styles.btn}>
          Delete
        </Button>
        <EditBookForm className={styles.btn} id={data._id} />
      </div>
    </div>
  );
};

export default BookItem;
