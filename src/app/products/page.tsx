"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  Firestore,
  orderBy,
  limit,
} from "firebase/firestore";
import { db, storage } from "@/app/db/firebase";
interface Portfolios {
  nama?: string;
  tipe: string;
  harga: string;
  id: string;
}
function Products() {
  const [portfolios, setPortfolios] = useState<Portfolios[]>([]);
  useEffect(() => {
    getPortfolios();
  }, []);
  async function getPortfolios() {
    try {
      const ordersRef = collection(db, "produk");
      // Add orderBy clause to the query
      const q = query(ordersRef, orderBy("nama")); // or "asc" for ascending order
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No documents found with status 'public'");
        return;
      }

      let data: Portfolios[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...(doc.data() as Portfolios), id: doc.id });
      });
      setPortfolios(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div>
      {portfolios.map((data, i) => (
        <>
          <div className="py-1">
            <a href={`products/${data.id}`}>
              {data.nama} - {data.id}
            </a>
          </div>
        </>
      ))}
    </div>
  );
}

export default Products;
