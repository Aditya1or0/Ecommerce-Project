// src/components/Auth/AuthForm.tsx
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type Props = {
  formValues: any;
  errors: any;
  touched: any;
  isLogin: boolean;
  loading: boolean;
  formValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (field: "email" | "password") => void;
  onSubmit: (e: React.FormEvent) => void;
  toggleMode: () => void;
};

export default function AuthForm({
  formValues,
  errors,
  touched,
  isLogin,
  loading,
  formValid,
  onChange,
  onBlur,
  onSubmit,
  toggleMode,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      {!isLogin && (
        <p className="text-center text-gray-600 mb-6">
          Fill in your details to get started
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-5 w-[300px] sm:w-[400px]">
        {!isLogin && (
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={formValues.firstName}
                onChange={onChange}
                placeholder="John"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={formValues.lastName}
                onChange={onChange}
                placeholder="Doe"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                required
              />
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formValues.email}
            onChange={onChange}
            onBlur={() => onBlur("email")}
            placeholder="you@example.com"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
              touched.email && errors.email ? "border-red-500 bg-red-50" : ""
            }`}
            required
            aria-invalid={touched.email && errors.email ? "true" : "false"}
            aria-describedby={
              touched.email && errors.email ? "email-error" : undefined
            }
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-600" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formValues.password}
              onChange={onChange}
              onBlur={() => onBlur("password")}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all pr-10 ${
                touched.password && errors.password
                  ? "border-red-500 bg-red-50"
                  : ""
              }`}
              required
              aria-invalid={
                touched.password && errors.password ? "true" : "false"
              }
              aria-describedby={
                touched.password && errors.password
                  ? "password-error"
                  : undefined
              }
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="mt-1 text-sm text-red-600" id="password-error">
              {errors.password}
            </p>
          )}
        </div>

        {isLogin && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-gray-600">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-cyan-600 hover:text-cyan-700 font-medium"
            >
              Forgot password?
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !formValid}
          className={`w-full bg-cyan-600 text-white py-3 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all flex items-center justify-center font-medium mt-2 ${
            loading || !formValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none"
            type="button"
          >
            {isLogin ? "Sign up here" : "Sign in here"}
          </button>
        </p>
      </div>

      {/* Signup with clerk */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          <button
            // onClick={toggleMode}
            className="text-cyan-600 hover:text-cyan-700 font-medium focus:outline-none"
            type="button"
          >
            Signup with Google
          </button>
        </p>
      </div>
    </div>
  );
}
