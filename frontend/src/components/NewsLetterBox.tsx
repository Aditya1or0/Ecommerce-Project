import React, { FormEvent } from "react";
import { toast } from "react-toastify";

const NewsLetterBox: React.FC = () => {
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.currentTarget.reset();
    toast("Thank you for subscribing!");
  };

  return (
    <div className="text-center my-10">
      <p className="font-bold  text-gray-700 text-3xl">
        Subscribe Now for Instant{" "}
        <span className="text-cyan-600">Notifications!</span>
      </p>
      <p className="text-gray-800 ml-10 text-md mt-3">
        Stay ahead of the game with our subscription service—get fast
        notifications on new arrivals, exclusive deals, and special events
        delivered straight to your inbox. Don't miss out on the latest trends
        and offers! Sign up today and be the first to know!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 my-6 mx-auto border border-gray-300  pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none bg-transparent "
          required
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-10 py-4 font-medium transition-colors duration-200"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
