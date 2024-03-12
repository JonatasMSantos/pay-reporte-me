"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createPayment: (value: string) => void;
}

const AddPayment: FC<Props> = ({ createPayment }) => {
  // State for handling input value
  const [input, setInput] = useState("");

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Event handler for adding a new payment
  const handleAdd = async () => {
    createPayment(input);
    setInput("");
  };

  // Rendering the AddPayment component
  return (
    <div className="w-full flex gap-1 mt-2">
      {/* Input field for entering new payment text */}
      <input
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleInput}
        value={input}
      />
      {/* Button for adding a new payment */}
      <button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddPayment;
