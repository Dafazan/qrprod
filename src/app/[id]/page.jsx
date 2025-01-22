'use client'
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/db/firebase";


function ProdDet({params}) {

   const [fetchedDocumentData, setFetchedDocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "produk", params.id); // Reference the specific document
        const docSnap = await getDoc(docRef);
        setFetchedDocumentData(docSnap.data());
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!fetchedDocumentData) {
    return <div>No data found</div>;
  }

  return (
    <div className="text-red-500  text-xl w-screen h-screen flex justify-center items-start p-5">
      <div className="border-2 w-full border-red-500 rounded-md p-2 flex flex-col">
<div className="w-full flex justify-center">

      <div className="border-2 border-red-500 rounded-md w-[200px] h-[200px] flex justify-center items-center">
        <p>Product Image</p>
      </div>
</div>
<div className=" mt-3 border-b-2 border-red-500"></div>
      <p className="break-words text-4xl font-semibold uppercase">{fetchedDocumentData.nama}</p>
      <p className="break-words font-bold">Type: {fetchedDocumentData.tipe}</p>
      <p className="break-words ">Price: {fetchedDocumentData.harga}</p>
      <br />
      <p className="break-words ">{fetchedDocumentData.desc}</p>
      </div>

     
    </div>
  );
}

export default ProdDet;
