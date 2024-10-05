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
    <div className="text-red-500  text-xl w-screen h-screen flex justify-center items-center">
      <div>

      <p className="text-2xl font-semibold">{fetchedDocumentData.nama}</p>
      <p>Type: {fetchedDocumentData.tipe}</p>
      <p>Price: {fetchedDocumentData.harga}</p>
      </div>

     
    </div>
  );
}

export default ProdDet;
