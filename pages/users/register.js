import Link from "next/link";
import { useRef } from "react";
import axios from "axios";
import Alert from "../../components/Alert";
import { useUserContext } from "../../context/state";

// const apiUrl = "http://localhost:3000/api/v1/users/register";
let apiUrl = "https://todo-list-mem.vercel.app/api/v1/users/register";

const Register = () => {
   const [userState, userDispatch] = useUserContext();
   const emailRef = useRef("");
   const usernameRef = useRef("");
   const passwordRef = useRef("");
   const handleRegisterForm = (e) => {
      try {
         e.preventDefault();
         console.log("register form handler");
         let emailValue = emailRef.current.value,
            usernameValue = usernameRef.current.value,
            passwordValue = passwordRef.current.value;

         if (emailValue && usernameValue && passwordValue) {
            console.log({ passwordValue, emailValue, usernameValue });
            console.log({ userState });
            axios
               .post(apiUrl, { user: { username: usernameValue, email: emailValue, password: passwordValue } })
               .then(async (res) => {
                  console.log(res.data);
                  const success = res.data.success;
                  let msg;

                  if (success) {
                     msg = await res.data.msg;
                     const user = await res.data.user;
                     const users = await res.data.users;
                     userDispatch({
                        type: "REGISTER",
                        user,
                        users,
                        userAlert: { msg, classes: "bg-green-500" },
                     });
                     setTimeout(() => {
                        userDispatch({
                           type: "REGISTER",
                           userAlert: { msg: null, classes: null },
                        });
                     }, 5000);
                  } else {
                     msg = await res.data.msg;
                     userDispatch({
                        type: "REGISTER",
                        userAlert: { msg, classes: "bg-red-500" },
                     });
                     setTimeout(() => {
                        userDispatch({
                           type: "REGISTER",
                           userAlert: { msg: null, classes: null },
                        });
                     }, 5000);
                  }
               })
               .catch((err) => console.log(err));

            emailRef.current.value = "";
            usernameRef.current.value = "";
            passwordRef.current.value = "";
         } else {
            userDispatch({
               type: "REGISTER",
               userAlert: { msg: "username or email can't be blank", classes: "bg-red-500" },
            });
            setTimeout(() => {
               userDispatch({
                  type: "REGISTER",
                  userAlert: { msg: null, classes: null },
               });
            }, 5000);
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <section className="">
            <form
               action=""
               className="bg-slate-700 flex flex-col items-center mt-20 w-11/12 m-auto rounded sm:w-3/4 md:w-2/4"
               onSubmit={(e) => {
                  handleRegisterForm(e);
               }}>
               <h1 className="text-4xl sm:text-5xl text-white font-bold my-10">Register Form</h1>

               <Alert msg={userState?.userAlert.msg ?? ""} classes={userState?.userAlert.classes ?? ""} />

               <div className="flex flex-col items-center my-5 w-10/12 sm:w-3/4 lg:w-2/4">
                  <div className="my-2 m-auto w-full">
                     <input
                        ref={usernameRef}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        autoCorrect="true"
                        className="py-2 px-3 text-lg rounded outline-yellow-600 outline-4 placeholder:text-yellow-600 placeholder:opacity-80 w-full"
                     />
                  </div>
                  <div className="my-2 m-auto w-full">
                     <input
                        ref={emailRef}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        autoCorrect="true"
                        className="py-2 px-3 text-lg rounded outline-yellow-600 outline-4 placeholder:text-yellow-600 placeholder:opacity-80 w-full"
                     />
                  </div>
                  <div className="my-2 m-auto w-full">
                     <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoCorrect="true"
                        className="py-2 px-3 text-lg rounded outline-yellow-600 outline-4 placeholder:text-yellow-600  placeholder:opacity-80  w-full"
                     />
                  </div>
                  <div>
                     <button
                        type="submit"
                        className="bg-yellow-500 my-4 py-2 px-5 rounded hover:text-white hover:shadow-lg shadow-slate-600">
                        Register
                     </button>
                  </div>
                  <div className="my-3">
                     <Link href="/users/login">
                        <a className="text-sm font-mono text-white">
                           Have an account? <span className="bg-yellow-600 py-1  px-3 rounded ">Log In</span>
                        </a>
                     </Link>
                  </div>
               </div>
            </form>
         </section>
      </>
   );
};
export default Register;
