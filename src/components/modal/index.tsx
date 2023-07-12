import React from "react";
import { motion } from "framer-motion";
// import { X } from "@phosphor-icons/react";
interface BackdropProps{
  children: React.ReactNode;
  onClick: () => void;
}

export const Backdrop = ({ children, onClick, ...props }: BackdropProps) => {
  return (
    <motion.div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center `}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  closeModal: () => void;
}

export const Modal = ({ children, closeModal }: ModalProps) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
    },
  };

  return (
    <Backdrop
      onClick={closeModal}
    >
      <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* <Close onClick={closeModal}>
                    <X size={32} />
                </Close> */}

        {children}
      </motion.div>
    </Backdrop>
  );
};
