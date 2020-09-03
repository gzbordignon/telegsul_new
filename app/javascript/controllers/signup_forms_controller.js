import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import React from "react";
import ReactDOM from "react-dom";
import SignUpFormSelector from "../components/SignUpFormSelector";
import serialize from "form-serialize";

export default class extends Controller {
  connect() {
    const element = document.querySelector("#signup-form-selector");
    ReactDOM.render(<SignUpFormSelector />, element);
  }
  submitSignUpForm(e) {
    e.preventDefault();
    let data;
    const form = e.target;
    data = serialize(form);
    Rails.ajax({
      type: "POST",
      url: "/users.json",
      data: data,
      dataType: "json",
      success: res => {
        console.log(res);
      },
      error: res => {
        console.log(res);
        const errors = res.errors;
        getErrors(errors, form);
      },
    });
  }
}

const getErrors = (errors, form) => {
  for (let key in errors) {
    let errorsArray = [];
    for (let i = 0; i < errors[key].length; i++) {
      if (errors[key][i] == "can't be blank") {
        errorsArray.push("Não pode ser branco. ");
      } else if (errors[key][i] == "is the wrong length (should be 11 characters)") {
        errorsArray.push("Precisa ter 11 dígitos. ");
      } else if (errors[key][i] == "invalid name") {
        errorsArray.push("Precisa ter mais que um nome. Ex: João Silveira ");
      } else if (errors[key][i] == "is the wrong length (should be 14 characters)") {
        errorsArray.push("Precisa ter 14 dígitos. ");
      } else if (errors[key][i] == "is the wrong length (should be 2 characters)") {
        errorsArray.push("Precisa ter 2 dígitos. ");
      } else if (errors[key][i] == "is too short (minimum is 8 characters)") {
        errorsArray.push("Precisa ter de 8 à 9 dígitos. ");
      } else if (errors[key][i] == "is too short (minimum is 6 characters)") {
        errorsArray.push("Precisa ter no mínimo 6 caracteres. ");
      } else if (errors[key][i] == "invalid email") {
        errorsArray.push("Ex: joaodasilva@example.com");
      }
    }
    showErrors(form, key, errorsArray);
  }
};

const showErrors = (form, key, errorsArray) => {
  const div = form.querySelector(`input[name="user[${key}]"]`).parentNode;
  for (let i = 0; i < errorsArray.length; i++) {
    const p = document.createElement("p");
    div.prepend(p);
    p.innerHTML = errorsArray[i];
    p.style.color = "red";
  }
};
