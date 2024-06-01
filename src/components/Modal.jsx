import useAuth from "@utils/useAuth";

export const Modal = (isVisible) => {
  const { login } = useAuth();

  return (
    <dialog>
      {/* TODO: Add form and logic */}
      login modal
    </dialog>
  );
};

export default Modal;
