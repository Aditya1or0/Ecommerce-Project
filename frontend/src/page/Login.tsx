// // src/pages/LoginPage.tsx
// import AuthForm from "../components/Auth/AuthForm";
// import { useAuthForm } from "../hooks/useAuthForm";

import AuthForm from "../components/login/LoginForm";
import { useAuthForm } from "../hooks/useAuth";

export default function LoginPage() {
  const {
    formValues,
    errors,
    touched,
    isLogin,
    loading,
    formValid,
    setIsLogin,
    handleInputChange,
    handleBlur,
    onSubmit,
  } = useAuthForm();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div>
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-700">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
            ShopiFy
          </span>
        </h1>
        <AuthForm
          formValues={formValues}
          errors={errors}
          touched={touched}
          isLogin={isLogin}
          loading={loading}
          formValid={formValid}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onSubmit={onSubmit}
          toggleMode={() => setIsLogin(!isLogin)}
        />
      </div>
    </div>
  );
}
