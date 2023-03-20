import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";

function EditModal(props) {
    let { subCategory, budgetedAmount, handleSubmit, handleDeleteBudget, newBudgetedAmount, setNewBudgetedAmount } = props;

   
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Edit your {subCategory} budget
        </Modal.Title>
      </Modal.Header>
      <form
      id="update-campus-form"
      onSubmit={(evt) => handleSubmit(evt, subCategory, newBudgetedAmount )}
      className="column"
    >
      <Modal.Body>
      
        <h4 className='mb-2'>What is the budget amount ? </h4>
        <input type="text" class="form-control" id="defaultFormControlInput" 
        placeholder={parseInt(budgetedAmount)} 
        value={newBudgetedAmount}
          onChange={(evt) => setNewBudgetedAmount(evt.target.value)} />
        <Button variant="outline-dark" onClick={(evt) => handleDeleteBudget(evt, subCategory)}>Delete</Button>
      </Modal.Body>
      <Modal.Footer>
      
        <Button variant="outline-primary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" type="submit" onClick={props.onHide}>Save</Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditModal;