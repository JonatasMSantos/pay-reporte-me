"use client";
import {
  addPayment,
  deletePayment,
  editPayment,
  togglePayment,
} from "@/actions/payment-actions";
import { PaymentType } from "@/types/payment";
import { FC, useState } from "react";
import AddPayment from "./add-payment";
import Payment from "./payment";

interface Props {
  payments: PaymentType[];
}

const Payments: FC<Props> = ({ payments }) => {
  // State to manage the list of payment items
  const [paymentItems, setPaymentItems] = useState<PaymentType[]>(payments);

  // Function to create a new payment item
  const createPayment = (title: string) => {
    const id = (paymentItems.at(-1)?.id || 0) + 1;

    const newPayment: PaymentType = {
      id,
      title,
      done: false,
      due_date: new Date(),
      note: "",
    };

    addPayment(newPayment);
    setPaymentItems((prev) => [...prev, newPayment]);
  };

  // Function to change the text of a payment item
  const changePaymentText = (id: number, title: string) => {
    setPaymentItems((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, title } : payment
      )
    );
    editPayment(id, title);
  };

  // Function to toggle the "done" status of a payment item
  const toggleIsPaymentDone = (id: number) => {
    const payment = paymentItems.find((payment) => payment.id === id);

    setPaymentItems((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, done: !payment.done } : payment
      )
    );
    togglePayment(id, !payment?.done);
  };

  // Function to delete a payment item
  const deletePaymentItem = (id: number) => {
    setPaymentItems((prev) => prev.filter((payment) => payment.id !== id));
    deletePayment(id);
  };

  // Rendering the Payment List component
  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
      <div className="text-5xl font-medium">To-do app</div>
      <div className="w-full flex flex-col mt-8 gap-2">
        {/* Mapping through paymentItems and rendering Payment component for each */}
        {paymentItems.map((payment) => (
          <Payment
            key={payment.id}
            payment={payment}
            changePaymentText={changePaymentText}
            toggleIsPaymentDone={toggleIsPaymentDone}
            deletePaymentItem={deletePaymentItem}
          />
        ))}
      </div>
      {/* Adding Payment component for creating new payments */}
      <AddPayment createPayment={createPayment} />
    </main>
  );
};

export default Payments;
