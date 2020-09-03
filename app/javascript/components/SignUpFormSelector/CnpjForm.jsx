import React from "react";

const CnpjForm = () => {
  return (
    <div>
      <form data-action="submit->signup-forms#submitSignUpForm">
        <input type="hidden" name="document_type" value="CNPJ" />
        <div className="field">
          <label htmlFor="name">Nome da empresa</label>
          <br />
          <input type="text" name="name" />
        </div>

        <div className="field">
          <label htmlFor="document_number">CNPJ</label>
          <br />
          <input type="text" name="document_number" />
        </div>

        <div className="field">
          <label name="email">E-mail</label>
          <br />
          <input type="email" name="email" />
        </div>

        <div className="field">
          <label htmlFor="area_code">DDD</label>
          <br />
          <input type="text" name="area_code" />
        </div>
        <div>
          <label htmlFor="phone_number">Número do telefone</label>
          <br />
          <input type="text" name="phone_number" />
        </div>

        <div className="field">
          <label htmlFor="password">Senha</label>
          <br />
          <input type="password" name="password_confirmation" />
        </div>

        <div className="field">
          <label htmlFor="password_confirmation">Confirmação de senha</label>
          <br />
          <input type="password" name="password_confirmation" />
        </div>
        <div className="actions">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default CnpjForm;
