import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const SubmitModal = ({ show, onHide, onConfirm, summary, submitting }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Submit Test?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-4">
        <p className="text-muted mb-4">Are you sure you want to submit the test? Here is your summary:</p>
        <div className="row text-center mb-0">
          <div className="col-4">
            <h3 className="fw-bold text-success mb-0">{summary.answered}</h3>
            <small className="text-muted fw-bold">Answered</small>
          </div>
          <div className="col-4 border-start border-end">
            <h3 className="fw-bold text-warning mb-0">{summary.review}</h3>
            <small className="text-muted fw-bold">Review</small>
          </div>
          <div className="col-4">
            <h3 className="fw-bold text-danger mb-0">{summary.notVisited}</h3>
            <small className="text-muted fw-bold">Skipped</small>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pb-4">
        <Button variant="outline-secondary" onClick={onHide} className="px-4" disabled={submitting}>
          Continue Test
        </Button>
        <Button variant="primary" onClick={onConfirm} className="px-4 fw-bold" disabled={submitting}>
          {submitting ? (
            <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> Submitting...</>
          ) : "Submit Now"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmitModal;
