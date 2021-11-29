import React from "react";
import style from "../css/AdminAdd.module.css";

function AdminAdd({ id, name, notes }) {
  return (
    <div className={style.admins}>
      <h2>{id}</h2>
      <div>
        <h3>Name: {name} </h3>
      </div>
      <h3> Notes: {notes}</h3>
        </div>
  );
}

export default AdminAdd;