import React,{ useState } from "react";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAsync, setCredentials } from "../../../app/redux/auth/authSlice";

export default function SignDialogContainer() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.token);
    const nav = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setErrMsg(""); // Clear previous error messages
      setLoginLoading(true);
  
      try {
        const resultAction = await dispatch(loginAsync({ email, password }));
  
        if (loginAsync.fulfilled.match(resultAction)) {
          const userData = resultAction.payload;
          dispatch(setCredentials(userData));
          console.log(auth);
          nav("/");
        } else if (loginAsync.rejected.match(resultAction)) {
          setErrMsg("Login Failed: " + resultAction.error.message);
        }
      } catch (err) {
        console.error("Login error:", err);
        setErrMsg("An error occurred during login.");
      } finally {
        setLoginLoading(false);
      }
    };
  
    if (loginLoading) {
      return <Loading />;
    }
  
    return (
      <form
        className="mt-4 space-y-6 font-google text-primary"
        onSubmit={(e) => handleLogin(e)}
      >
        {/* {errMsg && <Alert message={errMsg} />} */}
        <div className="-space-y-px">
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
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="border-[1px] w-full px-2 py-3 rounded-xl my-2 outline-none border-secondary_accent focus:border-primary bg-transparent"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
  
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-400 focus:ring-indigo-500 border-secondary_accent rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-primary_accent"
            >
              Remember me
            </label>
          </div>
  
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-400 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
  
        <div>
          <button
            type="submit"
            // disabled={loginLoading}
            className="group disabled:bg-gray-400 text-secondary  relative w-fit flex justify-center py-2 px-4 border border-transparent text-md font-bold font-google2 rounded-xl bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Log in
          </button>
        </div>
      </form>
    );
  }
  