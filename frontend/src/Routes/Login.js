import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CgGoogle } from "react-icons/cg";
import { Navigate, useNavigate, usenavigate } from "react-router-dom";
import checkUserName from "../helpers/validators/usernameValidator";

import "../styles/animations.css";
import { login } from "../App/features/authSlice";
//bg #4b1b8b
//wp #2b134b
//btn #fb8932
//text f3f2fb

const Login = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUsernameValid, setUsernameValid] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const naviagate = useNavigate();

  const LoginHandler = (e) => {
    e.preventDefault();
    if (username !== "" && email !== "") {
      dispatch(login({ username, email, password }));
    }
  };

  useEffect(() => {
    isLoggedIn === true && naviagate("/");
  }, [isLoggedIn]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-background-purple">
      <div className="w-4/6 h-4/6 flex rounded-lg bg-wrapper-purple ">
        {/* left */}
        <section className="w-1/2 h-full flex justify-center items-center">
          <div
            className="w-5/6 h-5/6 overflow-hidden bg-slate-400"
            id="imageAni"
          ></div>
        </section>

        <section className="w-1/2 h-full flex items-center justify-center">
          <div className="w-5/6 h-5/6 pl-[100px]">
            <div className="h-1/3 w-full">
              <div className="w-5/6 h-1/2">
                <article className="w-full h-full">
                  <h1 className="text-4xl text-slate-200 font-semibold">
                    Sign In
                  </h1>
                  <p className="text-lg text-slate-500">
                    Do not have an Account?
                    <span className="mx-2 text-blue-400 cursor-pointer hover:underline">
                      Sign Up
                    </span>
                  </p>
                </article>
                <div className="h-1/2">
                  <button className="w-full h-[50px] px-2 py-1 flex items-center justify-center rounded-full font-semibold text-white text-lg bg-red-600">
                    <CgGoogle className="text-2xl mr-2" />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="h-2/3 w-full">
              <form className="w-5/6 flex flex-col">
                <input
                  className={`${
                    !isUsernameValid && "border-2 border-red-400"
                  } h-[50px] my-2 px-2 py-1 rounded-full outline-none`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={(e) =>
                    setUsernameValid(checkUserName(e.target.value))
                  }
                />
                <input
                  className="h-[50px] my-2 px-2 py-1 rounded-full outline-none"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="h-[50px] my-2 flex items-center justify-between rounded-full bg-white">
                  <input
                    onBlur={() => console.log("fuck")}
                    type={`${showPassword ? "text" : "password"}`}
                    className="w-5/6 h-full px-2 py-1 rounded-full outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <AiFillEye
                      onClick={() => setShowPassword((pv) => !pv)}
                      className="mr-3 text-black text-xl cursor-pointer hover:opacity-80"
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={() => setShowPassword((pv) => !pv)}
                      className="mr-3 text-black text-xl cursor-pointer hover:opacity-80"
                    />
                  )}
                </div>
                <button
                  className="h-[50px] my-2 px-2 py-1 text-lg font-semibold text-slate-100 rounded-full bg-orange-400 focus:ring-1 focus:border-sky-500"
                  onClick={(e) => LoginHandler(e)}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
