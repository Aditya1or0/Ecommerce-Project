// src/hooks/useAuthForm.ts
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, register } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store/store";

export const useAuthForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [formValid, setFormValid] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    return password.length < 6 ? "Password must be at least 6 characters" : "";
  };

  useEffect(() => {
    const emailErr = validateEmail(formValues.email);
    const passwordErr = validatePassword(formValues.password);

    setErrors({ email: emailErr, password: passwordErr });

    let isValid = !emailErr && !passwordErr;
    if (!isLogin) {
      isValid =
        isValid &&
        formValues.firstName.trim() !== "" &&
        formValues.lastName.trim() !== "";
    }

    setFormValid(isValid);
  }, [formValues, isLogin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(formValues.email);
    const passwordErr = validatePassword(formValues.password);
    if (emailErr || passwordErr) {
      toast.error("Please fix validation errors");
      return;
    }

    if (!isLogin && (!formValues.firstName || !formValues.lastName)) {
      toast.error("First and last name are required");
      return;
    }

    try {
      if (isLogin) {
        await dispatch(
          login({ email: formValues.email, password: formValues.password })
        ).unwrap();
        toast.success("Login successful!");
        navigate("/");
      } else {
        await dispatch(register(formValues)).unwrap();
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch {
      toast.error(error);
    }
  };

  return {
    formValues,
    errors,
    touched,
    loading,
    formValid,
    isLogin,
    setIsLogin,
    handleInputChange,
    handleBlur,
    onSubmit,
  };
};
