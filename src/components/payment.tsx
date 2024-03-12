"use client";
import { PaymentType } from "@/types/payment";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  payment: PaymentType;
  changePaymentText: (id: number, title: string) => void;
  toggleIsPaymentDone: (id: number, done: boolean) => void;
  deletePaymentItem: (id: number) => void;
}

const payment: FC<Props> = ({
  payment,
  changePaymentText,
  toggleIsPaymentDone,
  deletePaymentItem,
}) => {
  // State for handling editing mode
  const [editing, setEditing] = useState(false);

  // State for handling title input
  const [title, setText] = useState(payment.title);

  // State for handling "done" status
  const [isDone, setIsDone] = useState(payment.done);

  // Event handler for title input change
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Event handler for toggling "done" status
  const handleIsDone = async () => {
    toggleIsPaymentDone(payment.id, !isDone);
    setIsDone((prev) => !prev);
  };

  // Event handler for initiating the edit mode
  const handleEdit = () => {
    setEditing(true);
  };

  // Event handler for saving the edited title
  const handleSave = async () => {
    changePaymentText(payment.id, title);
    setEditing(false);
  };

  // Event handler for canceling the edit mode
  const handleCancel = () => {
    setEditing(false);
    setText(payment.title);
  };

  // Event handler for deleting a payment item
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this payment?")) {
      deletePaymentItem(payment.id);
    }
  };

  // Rendering the payment component
  return (
    <div className="flex items-center gap-2 p-4 border-gray-200 border-solid border rounded-lg">
      {/* Checkbox for marking the payment as done */}
      <input
        type="checkbox"
        className="title-blue-200 rounded-sm h-4 w-4"
        checked={isDone}
        onChange={handleIsDone}
      />
      {/* Input field for payment title */}
      <input
        type="title"
        value={title}
        onChange={handleTextChange}
        readOnly={!editing}
        className={`${
          payment.done ? "line-through" : ""
        } outline-none read-only:border-transparent focus:border border-gray-200 rounded px-2 py-1 w-full`}
      />
      {/* Action buttons for editing, saving, canceling, and deleting */}
      <div className="flex gap-1 ml-auto">
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 title-green-50 rounded px-2 w-14 py-1"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-400 title-blue-50 rounded w-14 px-2 py-1"
          >
            Edit
          </button>
        )}
        {editing ? (
          <button
            onClick={handleCancel}
            className="bg-red-400 w-16 title-red-50 rounded px-2 py-1"
          >
            Close
          </button>
        ) : (
          <button
            onClick={handleDelete}
            className="bg-red-400 w-16 title-red-50 rounded px-2 py-1"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default payment;
