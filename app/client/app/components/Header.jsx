import React, { useState } from "react";
import Modal from "./Modal/Modal";
import Connector from "./Connector";
import P from "./Paragraph/P";
const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white "
      >
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal} // Pass the handler to close the modal
        title="A Secure Platform for Land Registration, Inspection, and Validation on Starknet."
        closeText="Close"
      >
      
        <P>Effortless land Registration with Unique property id's</P>
        <P>Streamlined land inspection and verification for trusted records</P>
        <P></P>
        <Connector />
      </Modal>
    </div>
  );
};

export default ParentComponent;
