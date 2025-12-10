import React from "react";

const AdmissionForm = () => {
    const handlePrint = () => {
        const content = document.getElementById("admissionFormContent").innerHTML; // Select the content
        const printWindow = window.open("", "_blank", "width=800,height=600"); // Open a new window
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Admission Form</title>
              <style>
                /* Add your styles for the print version here */
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                }
              </style>
            </head>
            <body>${content}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print(); // Trigger the print dialog
        printWindow.close();
      };
  return (
    <>
      {/* Modal Start */}
      <div
        className="modal fade"
        id="admissionFormModal"
        tabIndex="-1"
        aria-labelledby="admissionFormModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <img
                src="img/AdmFormLogo.png"
                alt="Admission Form Logo"
                style={{ maxHeight: "125px", width: "auto" }}
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <h5 className="modal-title text-center text-decoration-underline">
                Admission Form
              </h5>

              <p className="fs-5 fw-bold">Personal Details</p>
              <form id="admissionForm">
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="middleName" className="form-label">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="middleName"
                      name="middleName"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="surname" className="form-label">
                      Surname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="surname"
                      name="surname"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      name="age"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="contactNumber" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactNumber"
                      name="contactNumber"
                      required
                    />
                  </div>
                </div>

                <p className="fs-5 fw-bold">10th Grade Marks</p>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="mathMarks" className="form-label">
                      Mathematics Marks
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="mathMarks"
                      name="mathMarks"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="mathMaxMarks" className="form-label">
                      Maximum Marks
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="mathMaxMarks"
                      name="mathMaxMarks"
                    />
                  </div>
                </div>

                {/* Other grade marks go here */}

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="specialConcession" className="form-label">
                      Special Concession Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="specialConcession"
                      name="specialConcession"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="feePaid" className="form-label">
                      Fee Paid
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="feePaid"
                      name="feePaid"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="feeBalance" className="form-label">
                      Fee Balance
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="feeBalance"
                      name="feeBalance"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="studentName" className="form-label">
                    Student Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentName"
                    name="studentName"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  {/* Add a Print Button */}
      <button onClick={handlePrint} className="btn btn-primary">
        Print Admission Form
      </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal End */}
    </>
  );
};

export default AdmissionForm;
