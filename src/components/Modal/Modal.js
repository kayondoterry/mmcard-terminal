function Modal({ onClose, className, children, isOpen }) {
  const handleOnClose = () => {
    onClose();
  };

  return isOpen ? (
    <div onClick={handleOnClose} className={`fixed top-0 w-full h-full ${className}`}>
      {children}
    </div>
  ) : null;
}

export default Modal;
