import React from "react";

const CpfForm = () => {
  return (
    <div>
      <form data-action="submit->signup-forms#submitSignUpForm">
        <input type="hidden" name="user[document_type]" value="CPF" />
        <div className="field">
          <label htmlFor="name">Nome completo</label>
          <br />
          <input type="text" name="user[name]" />
        </div>

        <div className="field">
          <label htmlFor="document_number">CPF</label>
          <br />
          <input type="text" name="user[document_number]" />
        </div>

        <div className="field">
          <label name="email">E-mail</label>
          <br />
          <input type="email" name="user[email]" />
        </div>

        <div className="field">
          <label htmlFor="area_code">DDD</label>
          <br />
          <input type="text" name="user[area_code]" />
        </div>
        <div>
          <label htmlFor="phone_number">Número do telefone</label>
          <br />
          <input type="text" name="user[phone_number]" />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <br />
          <input type="password" name="user[password]" />
        </div>

        <div className="field">
          <label htmlFor="password_confirmation">Confirmação de senha</label>
          <br />
          <input type="password" name="user[password_confirmation]" />
        </div>
        <div className="actions">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default CpfForm;
