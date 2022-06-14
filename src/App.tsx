import "./App.css";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import logoFPT from "./assets/logo-fpt.png";
import Modal from "./Modal";
import { checkDate } from "./utils/dateChecker";
type Date = {
  day: string;
  month: string;
  year: string;
};
type returnMessage = {
  isError: boolean;
  message: string;
};
const App = () => {
  const [showModal, setShowModal] = useState<boolean>();
  const [date, setDate] = useState<Date>();
  const [modalMessage, setModalMessage] = useState<returnMessage>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Date>();
  const onSubmit: SubmitHandler<Date> = (data) => {
    setDate(data);
    setModalMessage(checkDate(data));
    setShowModal(true);
  };
  const onClear = () => {
    setDate(undefined);
    reset();
  };
  const onError = (errors: any, e: any) => console.log(errors, e);
  // const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   console.log(event.target.value);
  // };
  return (
    <div className="bg-gray-50 grid place-items-center h-screen ">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        content={modalMessage}
      />
      <div className="bg-white rounded-xl shadow-lg p-9 h-98 w-10/12 sm:w-8/12 md:w-6/12 app-container">
        <div className="logo-container">
          <img className="w-1/6 logo" src={logoFPT} alt="fpt-logo" />
        </div>
        <p className="text-3xl text-yellow-700 capitalize text-center	font-semibold heading">
          Date time checker
        </p>
        <div className="flex content-center justify-center">
          <form
            className="px-8 pt-6 pb-8 mb-4 w-2/3 item-center"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="day"
              >
                Day
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="day"
                type="text"
                placeholder="Day"
                defaultValue={date?.day}
                {...register("day", {
                  required: "Day is required",
                  pattern: {
                    value: /^[0-9]{0,9}?$/i,
                    message: "Please input valid number",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="day"
                render={({ message }) => (
                  <p className="text-red-600 error-message">{message}</p>
                )}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="month"
              >
                Month
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                id="month"
                type="text"
                placeholder="Month"
                defaultValue={date?.month}
                {...register("month", {
                  required: "Month is required",
                  pattern: {
                    value: /^[0-9]{0,9}?$/i,
                    message: "Please input valid number",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="month"
                render={({ message }) => (
                  <p className="text-red-600 error-message">{message}</p>
                )}
              />
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="year"
              >
                Year
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="year"
                type="text"
                placeholder="Year"
                defaultValue={date?.year}
                {...register("year", {
                  required: "Year is required",
                  pattern: {
                    value: /^[0-9]{0,9}?$/i,
                    message: "Please input valid number",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="year"
                render={({ message }) => (
                  <p className="text-red-600 error-message">{message}</p>
                )}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-2/5 m-5"
                type="button"
                onClick={onClear}
              >
                Clear
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-2/5"
                type="submit"
              >
                Check
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
