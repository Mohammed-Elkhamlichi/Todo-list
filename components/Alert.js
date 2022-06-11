import { XIcon } from "@heroicons/react/solid";

const Alert = ({ msg, classes }) => {
   return (
      <>
         {msg && (
            <div d={` flex flex-row  rounded text-center  opacity-90 text-white ${classes} w-96 m-auto mt-4 px-2 py-2`}>
               {msg}
               {/* <span>
                  <XIcon className="h-6 w-6 bg-slate-700 rounded" />{" "}
               </span> */}
            </div>
         )}
      </>
   );
};

export default Alert;
