import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [emailInputState, setEmailInputState] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  /**---------- FUNCTION TO VALIDATE EMAIL ------------ */
  const validateEmail = (email) => /^[^@]+@[^@]+\.[^@]+$/.test(email);

  const submitForm = (e) => {
    e.preventDefault();

    //Empty Form Submission is not allowed
    if (!emailInputState.trim()) {
      setShowError(true);
      setEmailInputState("Enter email first.");
      setTimeout(() => {
        setEmailInputState("");
        setShowError(false);
      }, 2000);
      return;
    }

    //Email Validation at Front-End
    if (!validateEmail(emailInputState)) {
      setShowError(true);
      setEmailInputState("Invalid email format.");
      setTimeout(() => {
        setEmailInputState("");
        setShowError(false);
      }, 2000);
      return;
    }

    setLoading(true);

    fetch("https://test.ezworks.ai/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInputState }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setShowSuccess(true);
          //The form is submitted successfully, API will return 200 in Response, and “ Form Submitted” will be displayed in the text field.
          setEmailInputState("Form Submitted");
          setTimeout(() => {
            setEmailInputState("");
            setShowSuccess(false);
          }, 2000);
        } else if (data?.detail) {
          setShowError(true);
          //An error will be returned in API Response when the email ends with @ez.works. Displaying that error inside the form field.
          setEmailInputState(data?.detail);
          setTimeout(() => {
            setEmailInputState("");
            setShowError(false);
          }, 2000);
        }
      })
      .catch(() => {
        setShowError(true);
        //Displaying the error inside error field if some other error occurred
        setEmailInputState("Something went wrong. Please try again.");
        setTimeout(() => {
          setEmailInputState("");
          setShowError(false);
        }, 2000);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="input-container" onSubmit={submitForm}>
      <input
        value={emailInputState}
        onChange={(e) => setEmailInputState(e.target.value)}
        className={`email-input`}
        type="email"
        placeholder={"Email Address"}
        disabled={showSuccess || showError}
      />
      <button
        className="submit-button"
        disabled={loading || showSuccess || showError}
      >
        {loading ? "Contacting..." : "Contact Me"}
      </button>
    </form>
  );
};

export default ContactForm;
