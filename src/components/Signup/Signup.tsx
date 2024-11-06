import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useForm } from "react-hook-form";
import AuthService from "../../appwrite/auth/AuthService";
import { login } from "../../redux/reducers/auth_slice";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Logo from "../Logo/Logo";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<SignupData>();

  const create = async (data: SignupData) => {
    setError("");
    try {
      const userData = await AuthService.createAccount(
        data.username,
        data.email,
        data.password
      );
      if (userData) {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full" bgColor="" textColor="">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
