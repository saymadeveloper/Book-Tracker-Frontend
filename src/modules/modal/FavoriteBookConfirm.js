import React from "react";
import { Modal } from "react-bootstrap";

export default function FavoriteBookConfirm({ show, onHide, actionFavorite, book }) {

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Favorite 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Are you sure changes this record?</span>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light mr-3 btn-elevate"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={()=>actionFavorite(book)}
            className="btn submit-btn btn-elevate"
          >
            Yes
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}