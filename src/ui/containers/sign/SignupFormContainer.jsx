import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials, signUpAsync } from "../../../app/redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
//import Loading from "../../../components/Loading";
//import Alert from "../../../components/Alert";

export default function SignupFormContainer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.token);

  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // setErrMsg("");
    setLoginLoading(true);

    try {
      const resultAction = await dispatch(
        signUpAsync({ name, email, password })
      );

      if (signUpAsync.fulfilled.match(resultAction)) {
        const userData = resultAction.payload;
        dispatch(setCredentials(userData));
        console.log(auth);
        nav("/");
      } else if (signUpAsync.rejected.match(resultAction)) {
        setErrMsg("Signup Failed: " + resultAction.error.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrMsg("An error occurred during Signup.");
    } finally {
      setLoginLoading(false);
    }
  };

  if (loginLoading) {
    return <Loading />;
  }

  return (
    <form
      className="mt-8 space-y-6 text-primary font-google"
      onSubmit={handleLogin}
    >
      {/* {errMsg && <Alert message={errMsg} />} */}
      <div className="-space-y-px">
        <div>
          <label htmlFor="text" className="sr-only">
            Email address
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="border-[1px] w-full px-2 py-3 rounded-xl my-2 outline-none border-secondary_accent focus:border-primary bg-transparent"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="border-[1px] w-full px-2 py-3 rounded-xl my-2 outline-none border-secondary_accent focus:border-primary bg-transparent"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Create Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="border-[1px] w-full px-2 py-3 rounded-xl my-2 outline-none border-secondary_accent focus:border-primary bg-transparent"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="current-password"
            required
            className="border-[1px] w-full px-2 py-3 rounded-xl my-2 outline-none border-secondary_accent focus:border-primary bg-transparent"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-secondary_accent bg-seconadary rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-primary_accent"
          >
            I Accept the <span className="text-blue-400">Privacy Policy</span>{" "}
            and the <span className="text-blue-400">Term & Conditions</span>.
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-fit flex justify-center py-2 px-4 border border-transparent text-md font-bold font-google2 rounded-xl text-secondary bg-primary hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}
