import axios from "axios";
import React, { useEffect, useState } from "react";

export const Crud = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState([
    { name: "", lastname: "", email: "", salary: 0 },
  ]);
  useEffect(() => {
    getData();
  }, []);

  const clearData = () => {
    setInput([{ name: "", lastname: "", email: "", salary: 0 }]);
  };

  const getData = async () => {
    const { data } = await axios.get("http://localhost:4000/");
    console.log(data.users);
    setUsers(data.users);
  };

  const saveUser = async () => {
    try {
      await axios.post("http://localhost:4000/", input);
      clearData();
      getData();
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.message);
      }
      console.log("Error in saveUser", error.message);
    }
  };

  const actions = (e) => {
    e.preventDefault();
    saveUser();
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center flex-column mt-5">
        {/* Form begin */}
        <div className="col-12 col-md-8 mx-auto mb-3">
          <div className="card ">
            <h1 className="card-title text-center">CRUD</h1>
            <div className="card-body">
              <form onSubmit={actions}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={input.name}
                  required
                  onChange={(e) => setInput.name(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Lastname"
                  value={input.lastname}
                  required
                  onChange={(e) => setInput.lastname(e.target.value)}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="E-mail"
                  value={input.email}
                  required
                  onChange={(e) => setInput.email(e.target.value)}
                />
                <label className="form-label text-muted">Salary:</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Salary"
                  value={input.salary}
                  onChange={(e) => setInput.salary(e.target.value)}
                />
              </form>
              <button
                className="btn btn-primary form-control"
                type="submit"
                onClick={saveUser()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {/* Form end */}

        {/* Table begin */}
        <div>
          <table className="table table-dark table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Lastname</th>
                <th>E-mail</th>
                <th>Salary</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>$ {user.salary}</td>
                  <td className="text-center">
                    <i className="bi bi-trash btn btn-danger mx-2"></i>
                    <i className="bi bi-pen btn btn-warning"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Table end */}
      </div>
    </div>
  );
};
