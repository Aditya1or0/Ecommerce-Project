import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { RootState, AppDispatch } from "../redux/store/store";
import { login, register } from "../redux/authSlice";

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false); // Track if email is touched
  const [passwordTouched, setPasswordTouched] = useState(false); // Track if password is touched

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  useEffect(() => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    let isFormValid = isEmailValid && isPasswordValid;

    if (!isLogin) {
      isFormValid =
        isFormValid && firstName.trim() !== "" && lastName.trim() !== "";
    }

    setFormValid(isFormValid);
  }, [email, password, firstName, lastName, isLogin]);

  const serverSideValidate = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isLogin && (firstName.trim() === "" || lastName.trim() === "")) {
      toast.error("First and last name are required");
      return false;
    }

    return isEmailValid && isPasswordValid;
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serverSideValidate()) {
      toast.error("Please check your inputs and try again");
      return;
    }

    try {
      if (isLogin) {
        const result = await dispatch(login({ email, password })).unwrap();

        if (result) {
          toast.success("Login successful!");
          navigate("/", { replace: true });
        }
      } else {
        await dispatch(
          register({ email, password, firstName, lastName })
        ).unwrap();
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold max-w-[300px] sm:max-w-[590px] mx-auto mt-[-70px] text-center mb-10 text-gray-700">
        Welcome to{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">
          ShopiFy
        </span>
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Doe"
                  required
                />
              </div>
            </>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onBlur={() => setEmailTouched(true)} // Mark as touched when the user leaves the field
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                emailTouched && emailError ? "border-red-500" : ""
              }`}
              placeholder="you@example.com"
              required
            />
            {emailTouched && emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              onBlur={() => setPasswordTouched(true)} // Mark as touched when the user leaves the field
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                passwordTouched && passwordError ? "border-red-500" : ""
              }`}
              placeholder="••••••••"
              minLength={6}
              required
            />
            {passwordTouched && passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !formValid}
            className={`w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors ${
              loading || !formValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
