import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  console.log(isLoggedIn, role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      {Data && (
        <div className="px-4 lg:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
          <div className="w-full lg:w-3/6  ">
            {" "}
            <div className="flex justify-around bg-zinc-800 p-12 rounded">
              <img
                src={Data.url}
                alt="/"
                className="h-[50vh] lg:h-[70vh] rounded"
              />
              <div className="flex md:flex-col">
                <button className="bg-white rounded-full text-3xl p-2 text-red-500">
                  <FaHeart />
                </button>
                <button className="bg-white rounded-full text-3xl p-2 mt-4 text-blue-500">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className=" a text-zinc-400 mt-l">by {Data.author}</p>
            <p className=" a text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="f1ex mt-a items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹ {Data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
