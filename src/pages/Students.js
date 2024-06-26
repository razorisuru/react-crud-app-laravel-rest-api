import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFoundPage from "../components/NotFoundPage";

function Students() {
  const [loading, setLoading] = useState([true]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/student")
      .then((res) => {
        console.log(res.data);
        setStudents(res.data.student);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          alert(error.response.data);
        }
        if (error.response.status === 500) {
          alert(error.response.data);
          return <NotFoundPage />;
        }
      });
  }, []);

  const deleteStudent = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerHTML =
      'Deleting <div class="spinner-border spinner-border-sm text-light" role="status"><span class="visually-hidden">Loading...</span></div>';

    axios
      .delete(`http://127.0.0.1:8000/api/student/del/${id}`)
      .then((res) => {
        // alert(res.data.message);
        thisClicked.closest("tr").remove();
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          alert(error.response.data);
          thisClicked.innerText = "Delete";
        }
        if (error.response.status === 500) {
          alert(error.response.data);
          return <NotFoundPage />;
        }
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  var studentDetails = "";
  studentDetails = students.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>
          <Link
            className="btn btn-sm btn-warning"
            to={`/students/edit/${item.id}`}
          >
            Edit
          </Link>
        </td>
        <td>
          <Link
            className="btn btn-sm btn-danger"
            onClick={(e) => deleteStudent(e, item.id)}
          >
            Delete
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Student Information{" "}
                <Link className="btn btn-success float-end" to="/students/add">
                  Add Student
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Edit</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>{studentDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
