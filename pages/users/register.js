import Link from "next/link";
import { useRef } from "react";
import axios from "axios";
import Alert from "../../components/Alert";
import { useUserContext } from "../../context/state";
import { useRouter } from "next/router";

// const apiUrl = "http://localhost:3000/api/v1/users/register";
let apiUrl = "https://todo-list-mem.vercel.app/api/v1/users/register";

const Register = () => {
   const router = useRouter();
   const [userState, userDispatch] = useUserContext();
   const emailRef = useRef("");
   const usernameRef = useRef("");
   const passwordRef = useRef("");

   const handleRegisterForm = (e) => {
      try {
         e.preventDefault();
         setTimeout(() => {
            userDispatch({
               type: "REGISTER",
               userAlert: { msg: null, classes: null },
            });
         }, 5000);
         // Take the inputs value
         let emailValue = emailRef.current.value;
         let usernameValue = usernameRef.current.value;
         let passwordValue = passwordRef.current.value;
         //if the inputs not empty
         if (emailValue && usernameValue && passwordValue) {
            // design the email and username patterns
            let usernameRegEx = /[a-z][a-z0-9]/;
            let emailRegEx = /\S+@\S+\.\S+/g;
            // Check if the inputs value is valid
            let validUserName = usernameRegEx.test(usernameValue);
            let validEmail = emailRegEx.test(emailValue);
            let validPassword = passwordValue.length >= 8;
            // if the username not valid
            if (!validUserName) {
               userDispatch({
                  type: "REGISTER",
                  userAlert: { msg: "Enter a valid Username", classes: "bg-red-500" },
               });
            }
            // if the email is incorrect
            if (!validEmail) {
               userDispatch({
                  type: "REGISTER",
                  userAlert: { msg: "Enter a valid Email", classes: "bg-red-500" },
               });
            }
            // If the password less than 8 char
            if (!validPassword) {
               userDispatch({
                  type: "REGISTER",
                  userAlert: { msg: "Password should be bigger then 8 char", classes: "bg-red-500" },
               });
            }
            if (validUserName && validEmail && validPassword) {
               axios
                  .post(apiUrl, {
                     user: {
                        username: usernameValue.toLowerCase(),
                        email: emailValue.toLowerCase(),
                        password: passwordValue,
                     },
                  })
                  .then(async (res) => {
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
                              user,
                              users,
                              userAlert: { msg: "", classes: "" },
                           });
                           router.push("/users/login");
                        }, 1000);
                     } else {
                        msg = await res.data.msg;
                        userDispatch({
                           type: "REGISTER",
                           userAlert: { msg, classes: "bg-red-500" },
                        });
                     }
                  })
                  .catch((err) => console.log(err));
               emailRef.current.value = "";
               usernameRef.current.value = "";
               passwordRef.current.value = "";
            }
         } else {
            userDispatch({
               type: "REGISTER",
               userAlert: { msg: "Please! complete your information", classes: "bg-red-500" },
            });
         }
      } catch (error) {
         userDispatch({
            type: "REGISTER",
            userAlert: { msg: "Internal Server Error", classes: "bg-red-500" },
         });
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
                        autoCorrect="false"
                        autoComplete="false"
                        autoCapitalize="true"
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
                        autoCorrect="false"
                        autoComplete="false"
                        autoCapitalize="false"
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
                        autoCorrect="false"
                        autoComplete="false"
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
                  <div className="my-3 text-sm font-mono  text-white flex flex-row items-center">
                     Have an account?
                     <Link href="/users/login">
                        <a
                           className=""
                           onClick={() => {
                              userDispatch({
                                 type: "REGISTER",
                                 userAlert: { msg: "", classes: "" },
                              });
                           }}>
                           <span className="bg-yellow-600 py-1  px-3 mx-2 rounded ">Log In</span>
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
