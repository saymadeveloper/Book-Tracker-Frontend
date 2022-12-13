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

export default function MyBook() {
  const fields = {
    bookName: "",
    year: "",
    authorName: ""
  }
  const history = useHistory();
  const [inputs, setInputs] = useState(fields);
  const [deleteId, setDeleteId] = useState("");
  const [bookList, setBookList] = useState([])
  const [book, setBook] = useState({})
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => { 
    if(!isLoggedIn){
      history.push("/");
    }
  }, [])
  useEffect(() => {
    getAllBookList(token);
  }, [token])


  const getAllBookList = (token) => {
    const URL = `${process.env.REACT_APP_API_URL}/book/get-all-books`;
    axios.get(URL, { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      if (response.data.status === 200) {
        setBookList(response.data.data);
      }
    }).catch(err => {
      showError(err);
    });
  }
  const addNewBook = () => {
    history.push('/my-book/add-book');
  }
  const validate = () => {
    if (!inputs.bookName) {
      showError("Book name is required");
      return false;
    }
    if (!inputs.year) {
      showError("Year is required");
      return false;
    }
    if (!inputs.authorName) {
      showError("Author name is required");
      return false;
    }
    return true;
  }

  const saveAction = () => {
    if (!validate()) {
      return false;
    }
    const URL = `${process.env.REACT_APP_API_URL}/book/add-book`;
    axios.post(URL, inputs, { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      if (response.data.status === 200) {
        showSuccess(response.data.message);
        getAllBookList(token)
        history.push("/my-book");
      } else {
        document.getElementById("bookName").value = "";
        document.getElementById("year").value = "";
        document.getElementById("authorName").value = "";
        showError(response.data.message);
      }
    }).catch(err => {
      showError(err);
    });
  }

  const handleIsFavorite = (book) =>{
    setBook(book)
    history.push('/my-book/favorite-book');
  }
  const actionFavorite = (book) =>{
    book.isFavorite = true;
    const URL = `${process.env.REACT_APP_API_URL}/book/is-favorite`;
    axios.put(URL, book, { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      if (response.data.status === 200) {
        showSuccess(response.data.message);
        getAllBookList(token)
        history.push("/my-book");
      } else {
        showError(response.data.message);
      }
    }).catch(err => {
      showError(err);
    });
  }
  const handleIsDeleted = (id) =>{
    setDeleteId(id)
    history.push('/my-book/delete-book')
  }

  const deleteAction = (id) =>{
    let obj = {}
    obj.id = id
    const URL = `${process.env.REACT_APP_API_URL}/book/deleted-book`;
    axios.put(URL, obj, { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      if (response.data.status === 200) {
        showSuccess(response.data.message);
        getAllBookList(token)
        history.push("/my-book");
      } else {
        showError(response.data.message);
      }
    }).catch(err => {
      showError(err);
    });
  }

  return (
    <div>
      <Route path="/my-book/add-book">
        {({ history, match }) => (
          <AddBookModal
            show={match != null}
            setInputs={setInputs}
            inputs={inputs}
            saveAction={saveAction}
            onHide={() => {
              setInputs(fields)
              history.push("/my-book");
            }}
          />
        )}
      </Route>
      <Route path="/my-book/favorite-book">
        {({ history, match }) => (
          <FavoriteBookConfirm
            show={match != null}
            book={book}
            actionFavorite={actionFavorite}
            onHide={() => {
              setBook(fields)
              history.push("/my-book");
            }}
          />
        )}
      </Route>
      <Route path="/my-book/delete-book">
        {({ history, match }) => (
          <DeleteConfirm
            show={match != null}
            id={deleteId}
            deleteAction={deleteAction}
            onHide={() => {
              history.push("/my-book");
            }}
          />
        )}
      </Route>
      <div><Navbar isLoggedIn={isLoggedIn} /></div>
      <div className="d-flex justify-content-between p-5">
        <div>
          <div>
            <p>Hi {name}! Here’s your reading list.</p>
          </div>
          {
            bookList.length === 0 ?
              <div>
                <p>You have no books added. Please add a book to get started.</p>
              </div> : ""
          }
        </div>
        <div>
          <button className="btn add-btn font-weight-bolder" onClick={addNewBook}><SVG className="mr-1" src={toAbsoluteUrl("/images/Add-Btn.svg")} />Add Book</button>
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
                <div class="p-2 bd-highlight"><button className="btn add-btn font-weight-bolder" onClick={()=>handleIsFavorite(book)}><SVG src={toAbsoluteUrl("/images/For-book-mark.svg")} /></button></div>
                <div class="p-2 bd-highlight"><button className="btn add-btn font-weight-bolder" onClick={()=>handleIsDeleted(book._id)}><SVG src={toAbsoluteUrl("/images/Delete.svg")} /></button></div>
              </div>

            </div>
          </div>
        ))
      }
    </div>
  );
}