import express from "express";
const router = express.Router();
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import Book from "../models/book.js";
import authenticateToken from "./userAuth.js";


//ADMIN VIEW

//add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({
        message: "You are not having access to perform admin work",
      });
    }
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    res.status(200).json({ message: "Book adds successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update book --admin
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(200).json({ 
        message: "Book update successfully",
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ 
        message: "Book deleted successfully",
     });
  } catch (error) { 
    return res.status(500).json({ message: "An error occurred" });
  }
});


//USER VIEW

//get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({ 
      status: "Success",
      data: books,
     });
  } catch (error) { 
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get recently added books limit 4
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({ 
      status: "Success",
      data: books,
     });
  } catch (error) { 
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.json({ 
      status: "Success",
      data: books,
     });
  } catch (error) { 
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
