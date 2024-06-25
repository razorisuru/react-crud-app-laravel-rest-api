import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

function Students() {
  const [loading, setLoading] = useState([true]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/student").then((res) => {
      console.log(res.data);
      setStudents(res.data.student);
      setLoading(false);
    });
  }, []);

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
            to={`/student/edit/${item.id}`}
          >
            Edit
          </Link>
        </td>
        <td>
          <Link
            className="btn btn-sm btn-danger"
            to={`/student/del/${item.id}`}
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
