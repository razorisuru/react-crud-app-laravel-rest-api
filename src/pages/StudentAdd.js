import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

function StudentAdd() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [student, setStudent] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      name: student.name,
      phone: student.phone,
      email: student.email,
    };

    axios
      .post("http://127.0.0.1:8000/api/student", data)
      .then((res) => {
        alert(res.data.message);
        navigate("/students");
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response.status === 422) {
          setInputErrorList(error.response.data.message);
          setLoading(false);
        }
        if (error.response.status === 500) {
          alert(error.response.data);
          setLoading(false);
        }
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Edit Student Information
                <Link className="btn btn-warning float-end" to="/students">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={saveStudent}>
                <div className="form-group mb-3">
                  <label>Student Name</label>
                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.email}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={student.phone}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.phone}</span>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-success">
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAdd;
