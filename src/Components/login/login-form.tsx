import { useState } from "react";
import { login } from "../../services/token-repository";
import burgerImg from "../../assets/burger.jpg";
import styles from "./login-form.module.css";
import { useNavigate } from "react-router-dom";
import { PATHNAMES } from "../../services/route-service";
import { useRequestHook } from "../../Hooks/use-request-hook";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { loading, useOnError, useOnLoading, execute } = useRequestHook();
  const [message, setMessage] = useState("");
  const initialFormState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setFormData((prevFormData) => ({ ...prevFormData, email: e.target.value }));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await execute(login(formData.email, formData.password));
    if (result !== null) navigate(PATHNAMES.HOME);
  };

  useOnError(setMessage);
  useOnLoading(setMessage);

  return (
    <>
      <section className={styles.login_site}>
        <img src={burgerImg} className={styles.login_site_img} alt="burger" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-email">E-mail:</label>
          <input
            required
            type="email"
            placeholder="email"
            disabled={loading}
            value={formData.email}
            onChange={handleChangeEmail}
          />
          <br />
          <label htmlFor="user-password">Password:</label>
          <input
            required
            type="password"
            placeholder="password"
            disabled={loading}
            value={formData.password}
            onChange={handleChangePassword}
          />
          <br />
          <button type="submit" disabled={loading}>
            Login
          </button>
          {message && <div aria-live="polite">{message}</div>}
        </form>
      </section>
    </>
  );
};
export default LoginForm;
