import { useState } from "react";
import { login } from "../../services/token-repository";
import burgerImg from "../../assets/burger.jpg";
import "./login-form.css";
import { useNavigate } from "react-router-dom";
import { PATHNAMES } from "../../services/route-service";
import { LoadingMessageHook } from "../../Hooks/loading-message-hook";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { loading, message, setLoading, setMessage } = LoadingMessageHook();

  const initialFormState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setFormData({ ...formData, email: e.target.value });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate(PATHNAMES.HOME);
    } catch (error) {
      setMessage((error as Error).message);
    }
    setLoading(false);
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
