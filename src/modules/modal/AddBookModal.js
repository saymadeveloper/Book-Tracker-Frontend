import React from "react";
import { Modal } from "react-bootstrap";

export default function AddBookModal({  show, onHide, saveAction, setInputs, inputs }) {
  
  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
            Add a book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label className='form-level-font-size font-style'><span className="mr-2">Book Name</span><span style={{ color: "red" }}>*</span></label>
          <input type="text" className="form-control" id="bookName" name={inputs.booKName} placeholder="Enter your book name" 
          onChange={
            (event) = (event) =>{
                setInputs({...inputs, "bookName":event.target.value})
            } 
            }
          />
        </div>
        <div className="mt-3">
          <label className='form-level-font-size font-style'><span className="mr-2">Year</span><span style={{ color: "red" }}>*</span></label>
          <input type="text" className="form-control" id="year" name={inputs.year} placeholder="Enter year"
          onChange={
            (event) = (event) =>{
                setInputs({...inputs, "year":event.target.value})
            } 
            }
          />
        </div>
        <div className="mt-3">
          <label className='form-level-font-size font-style'><span className="mr-2">Author</span><span style={{ color: "red" }}>*</span></label>
          <input type="text" className="form-control" id="authorName" name={inputs.authorName} placeholder="Enter your author name" 
          onChange={
            (event) = (event) =>{
                setInputs({...inputs, "authorName":event.target.value})
            } 
            }
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={saveAction}
            className="btn submit-btn btn-elevate"
          >
            Add Book
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}