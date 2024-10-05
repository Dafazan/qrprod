"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/app/db/firebase";
import Sidebar from "@/components/sidebar";
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

      // eslint-disable-next-line prefer-const
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
    <div className="w-full flex">
      <Sidebar />
      <div className="w-full p-5">
        <p className="text-red-500 font-bold text-xl mb-2">PRODUCT LIST</p>
        {portfolios.map((data, i) => (
          <>
            <div className="pb-1">
              <a
                className="text-red-500 hover:text-red-300 font-semibold text-xl"
                href={`products/${data.id}`}
              >
                {i + 1}. {data.nama}{" "}
                <span className="font-normal text-xs">{data.tipe}</span>
                <span className="font-normal text-xs">
                  {" "}
                  - Price: {data.harga}
                </span>
              </a>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Products;
