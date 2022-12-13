import React, { useEffect, useState } from "react";
import axios from 'axios';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../asset/AssetHelper";
import Navbar from "./Navbar";
import { useHistory, Route } from "react-router-dom";
import AddBookModal from "./modal/AddBookModal";
import FavoriteBookConfirm from "./modal/FavoriteBookConfirm";
import { showError, showSuccess } from "../pages/Alert";
import DeleteConfirm from "./modal/DeleteConfirm";

export default function MyFavoriteBook() {
  const fields = {
    bookName: "",
    year: "",
    authorName: ""
  }
  const history = useHistory();
  const [bookList, setBookList] = useState([])
  const [book, setBook] = useState({})
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    getFavoriteBookList(token);
  }, [token])


  const getFavoriteBookList = (token) => {
    const URL = `${process.env.REACT_APP_API_URL}/book/get-favorite-books`;
    axios.get(URL, { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      if (response.data.status === 200) {
        setBookList(response.data.data);
      }
    }).catch(err => {
      showError(err);
    });
  }
  const handleIsFavorite = (book) =>{
    setBook(book)
    history.push('/my-favorite-books/unfavorite-book');
  }
  const actionFavorite = (book) =>{
    book.isFavorite = false;
    const URL = `${process.env.REACT_APP_API_URL}/book/is-favorite`;
    axios.put(URL, book, { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      if (response.data.status === 200) {
        showSuccess(response.data.message);
        getFavoriteBookList(token)
        history.push("/my-favorite-books");
      } else {
        showError(response.data.message);
      }
    }).catch(err => {
      showError(err);
    });
  }
  return (
    <div> 
      <Route path="/my-favorite-books/unfavorite-book">
        {({ history, match }) => (
          <FavoriteBookConfirm
            show={match != null}
            book={book}
            actionFavorite={actionFavorite}
            onHide={() => {
              setBook(fields)
              history.push("/my-favorite-books");
            }}
          />
        )}
      </Route>
      <div><Navbar isLoggedIn={isLoggedIn} /></div>
      <div className="d-flex justify-content-between p-5">
        <div>
          <div>
            <p>Hi {name}! Here’s your favorite book list.</p>
          </div>
          {
            bookList.length === 0 ?
              <div>
                <p>You have no favorite books.</p>
              </div> : ""
          }
        </div>
      </div>
      {
        bookList.map((book) => (
          <div className="pl-5 pr-5 mt-5">
            <div className="book-list-div pl-5 pr-5 pt-3 pb-3">
              <div class="d-flex flex-wrap bd-highlight mb-3">
                <div class="mr-auto p-2 bd-highlight">
                    <span className="book-title">{book.bookName}</span>
                </div>
                <div class="p-2 bd-highlight"><button className="btn add-btn font-weight-bolder" onClick={()=>handleIsFavorite(book)}><SVG src={toAbsoluteUrl("/images/Book-mark.svg")} /></button></div>
              </div>

            </div>
          </div>
        ))
      }
    </div>
  );
}