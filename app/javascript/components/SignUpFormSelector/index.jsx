import React, { useState } from "react";
import CpfForm from "./CpfForm";
import CnpjForm from "./CnpjForm";
import NoForm from "./NoForm";

const SignUpFormSelector = () => {
  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  const handleChange = e => {
    setSelectedDocumentType(e.target.value);
  };

  let SignUpFormCustomComponent = NoForm;

  if (selectedDocumentType == "CPF") {
    SignUpFormCustomComponent = CpfForm;
  } else if (selectedDocumentType == "CNPJ") {
    SignUpFormCustomComponent = CnpjForm;
  }

  return (
    <div>
      <form>
        <label>Pessoa física</label>
        <input
          type="radio"
          name="document_type"
          value="CPF"
          // checked={selectedDocumentType === "CPF"}
          onChange={handleChange}
        />

        <label>Pessoa jurídica</label>
        <input
          type="radio"
          name="document_type"
          value="CNPJ"
          // checked={selectedDocumentType === "CNPJ"}
          onChange={handleChange}
        />
      </form>
      <div>
        <SignUpFormCustomComponent />
      </div>
    </div>
  );
};

export default SignUpFormSelector;
