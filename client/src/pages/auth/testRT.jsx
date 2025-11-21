import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const testRT = () => {
  // JS
  const [Form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const hldOnInput = (e) => {
    setForm({
      ...Form,
      [e.target.name]: e.target.value,
    });
  };
  const hldSubmitInForm = async () => {
    if (Form.password !== Form.confirmPassword) {
      return alert("Password is not match !!");
    }
    // To DB
    try {
      const res = await axios.post("", Form);
    } catch (error) {
      console.log(error);
    }
    console.log(Form);
  };
  return (
    // Background
    <div>
      {/* // The Card */}
      <div>
        {/*Title - Register */}
        <div>
          <h2>Register</h2>
          <div>cerate your account</div>
        </div>
        <form onSubmit={hldSubmitInForm}>
          {/* Email */}
          <div>
            <label>Email</label>
            <div>
              <input onChange={hldOnInput} />
            </div>
          </div>
          {/* Password */}
          <div>
            <label>Password</label>
            <div>
              <input onChange={hldOnInput} />
            </div>
          </div>
          {/*  confirmPassword */}
          <div>
            <label>confirmPassword</label>
            <div>
              <input onChange={hldOnInput} />
            </div>
          </div>
          {/* Submit button */}
          <div>
            <button onSubmit={hldSubmit}>Create Account</button>
          </div>
          {/* Link to Login */}
          <div>
            <span>Already have a account?</span>
            <Link>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default testRT;
