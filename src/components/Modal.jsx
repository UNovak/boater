import useAuth from "@utils/useAuth";
import { useForm } from "react-hook-form";

export const Modal = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const close = () => {
    document.getElementById("login_modal").close();
  };

  // runs when any button is clicked
  const onSubmit = (data) => {
    console.log(data);
    close();
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <dialog id="login_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          onClick={() => close()}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">Login or sign up</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default">close</button>
      </form>
    </dialog>
  );
};

export default Modal;
