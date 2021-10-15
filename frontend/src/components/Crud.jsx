import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const Crud = () => {
  const [users, setUsers] = useState([]);
  // const [input, setInput] = useState([
  //   { name: "", lastname: "", email: "", salary: 0 },
  // ]);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState(0);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const clearData = () => {
    setName("");
    setLastname("");
    setEmail("");
    setSalary(0);
    setEdit(false);
  };

  const getData = async () => {
    const { data } = await axios.get("http://localhost:4000/");
    setUsers(data.users);
  };

  const saveUser = async () => {
    try {
      const newUser = { name, lastname, email, salary };
      await axios.post("http://localhost:4000/", newUser);
      clearData();
      getData();
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.message);
      }
      console.log("Error in saveUser", error.message);
    }
  };

  const updateUser = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will modify this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const id = localStorage.getItem("id");
          console.log(id);
          const updatedUser = { name, lastname, email, salary };
          const { data } = await axios.put(
            "http://localhost:4000/userupdate/" + id,
            updatedUser
          );
          clearData();
          getData();
          Swal.fire({
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.message);
      }
      console.log("Error in saveUser", error.message);
    }
  };

  const getUser = async (id) => {
    try {
      const { data } = await axios.get("http://localhost:4000/userid/" + id);
      setUser(data.user);
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.message);
      }
      console.log("Error in getUser", error.message);
    }
  };

  const actions = (e) => {
    e.preventDefault();
    edit ? updateUser() : saveUser();
  };

  const restoreDataFields = (item) => {
    setEdit(true);
    setName(item.name);
    setLastname(item.lastname);
    setEmail(item.email);
    setSalary(item.salary);
    localStorage.setItem("id", item._id);
  };

  const deleteUser = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(
            "http://localhost:4000/userdelete/" + id
          );
          getData();
          clearData();
          Swal.fire({
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.message);
      }
      console.log("Error in deleteUser", error.message);
    }
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
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Lastname"
                  value={lastname}
                  required
                  onChange={(e) => setLastname(e.target.value)}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="E-mail"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label text-muted ms-2">Salary:</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                <button className="btn btn-primary form-control" type="submit">
                  Save
                </button>
              </form>
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
                <tr key={user._id} onClick={() => getUser(user._id)}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>$ {user.salary}</td>
                  <td className="text-center">
                    <i
                      className="bi bi-trash btn btn-danger m-2"
                      onClick={() => deleteUser(user._id)}
                    ></i>
                    <i
                      className="bi bi-pen btn btn-warning"
                      onClick={() => restoreDataFields(user)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Table end */}

        {/* User card begin */}

       <div className={Object.entries(user).length !== 0? "d-flex justify-content-center mb-3": "d-none"}>
          <div className="col-12 col-md-8">
            <div className="card">
              <h3 className="card-header">
                {user.name} {user.lastname}
              </h3>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="bi bi-envelope-fill me-2"></i>
                    {user.email}
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-cash-coin me-2"></i>$ {user.salary}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Card user ends */}
      </div>
    </div>
  );
};
