import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "./ContactForm.css";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submissionMessage) {
      setTimeout(() => {
        setSubmissionMessage("");
      }, 3000);
    }
  }, [loading]);

  const onSubmit = async (data) => {
    if (data) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://3.228.97.110:9000/api",
          JSON.stringify(data)
        );
        if (response.status === 200) {
          setLoading(false);
          setSubmissionMessage("Form Submitted");
          reset();
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError("email", {
            type: "manual",
            message: error.response.data.error,
          });
          setLoading(false);
        } else {
          console.error("Error submitting form:", error);
          setLoading(false);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <div>
          <input
            className="email-input"
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
              validate: {
                notEzWorks: (value) =>
                  !value.endsWith("@ez.works") ||
                  "Email ending with @ez.works is not allowed",
              },
            })}
          />
          {errors.email && (
            <div className="error-message">{errors.email.message}</div>
          )}
          {submissionMessage && (
            <div className="success-message">{submissionMessage}</div>
          )}
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting.." : "Contact Me"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
