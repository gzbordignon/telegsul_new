import { Controller } from "stimulus";
import React from "react";
import ReactDOM from "react-dom";
import PayTypeSelector from "../components/PayTypeSelector";

export default class extends Controller {
  connect() {
    const element = document.querySelector("#pay-type-selector");
    ReactDOM.render(<PayTypeSelector />, element);
  }
}
