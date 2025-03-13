import React from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const submitForm = () => {};

  return (
    <form onSubmit={submitForm}>
      <div className="input-container">
        <input
          className="email-input"
          type="email"
          placeholder={`Email Address`}
        />
        <button className="submit-button">Contact Me</button>
      </div>
    </form>
  );
};

export default ContactForm;
