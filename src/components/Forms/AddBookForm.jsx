import styles from "./AddBookForm.module.scss";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../services/api";
import { getBooks } from "../../hooks/useGetBooks";
import { useContext } from "react";
import { BookContext } from "../../contexts/BookContext";

const schema = yup.object().shape({
  title: yup.string().required("title is required"),
  author: yup.string().required("author is required"),
  isbn: yup.string().required("isbn is required"),
  publishedYear: yup.string().required("publishedYear is required"),
});

const AddBookForm = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Book</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mt-3">
            <DialogTitle>Add New Book</DialogTitle>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add New Book</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add New Book</DrawerTitle>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function ProfileForm({ className }) {
  const { bookList, setBookList } = useContext(BookContext);
  //   const getBook = useGetBooks;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    console.log(errors);
    Object.keys(errors).forEach((key) => {
      let tempStr = `${errors[key].message}`;
      toast.error(tempStr);
    });
  }, [errors]);
  const onSubmit = async (data) => {
    console.log("dd: ", data);
    const bodyData = {
      title: data.title,
      isbn: data.isbn,
      author: data.author,
      publishedYear: data.publishedYear,
    };
    console.log("data: ", bodyData);
    await postData("/api/books", bodyData)
      .then((data) => {
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
        toast.success("Book added successfully");
      })
      .catch((error) => {
        toast.error("book already exist");
      });
  };
  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" {...register("title")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="author">Author</Label>
        <Input type="text" id="author" {...register("author")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="isbn">ISBN</Label>
        <Input type="text" id="isbn" {...register("isbn")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="publishedYear">publishedYear</Label>
        <Input
          type="number"
          id="publishedYear"
          defaultValue="2017"
          {...register("publishedYear")}
        />
      </div>
      <Button type="submit">Add</Button>
    </form>
  );
}

export default AddBookForm;
