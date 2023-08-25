import { useState } from "react";
import { IUser } from "../../models/user";
import { ILoginResponse } from "../../models/response";
import { createSession, login } from "../../services/token-repository";
import burgerImg from "../../assets/burger.jpg";
import "./login-form.css";
import { useNavigate } from "react-router-dom";
import { PATHNAMES } from "../../services/route-service";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const initialFormState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const [loginLoading, setLoginLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, email: e.target.value });

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, password: e.target.value });

  const handleSession = (token: string, user: IUser) => {
    createSession(token, user);
    navigate(PATHNAMES.HOME);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoginLoading(true);
    login(formData.email, formData.password)
      .then((res: ILoginResponse) => {
        handleSession(res.accessToken, res.user);
      })
      .catch(setMessage)
      .finally(() => setLoginLoading(false));
  };

  return (
    <>
      <section className="login-site">
        <img src={burgerImg} alt="burger" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-email">E-mail:</label>
          <input
            required
            type="email"
            placeholder="email"
            disabled={loginLoading}
            value={formData.email}
            onChange={handleChangeEmail}
          />
          <br />
          <label htmlFor="user-password">Password:</label>
          <input
            required
            type="password"
            placeholder="password"
            disabled={loginLoading}
            value={formData.password}
            onChange={handleChangePassword}
          />
          <br />
          {loginLoading && (
            <>
              <span>Loading...</span>
              <br />
            </>
          )}
          {message && (
            <>
              <span>{message}</span>
              <br />
            </>
          )}
          <button type="submit" disabled={loginLoading}>
            Login
          </button>
        </form>
      </section>
    </>
  );
};
export default LoginForm;
