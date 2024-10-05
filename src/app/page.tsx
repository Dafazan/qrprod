"use client";
import React, { useState, useRef } from "react";
import { useQRCode } from "next-qrcode";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/db/firebase";

function QrGenerator() {
  const [nama, setNama] = useState<string>("");
  const [tipe, setTipe] = useState<string>("");
  const [harga, setHarga] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addData = async (e: any) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "produk"), {
      nama: nama,
      tipe: tipe,
      harga: harga,
    });

    //const documentId = docRef.id;
    setTextQr(
      "https://qrprod-5rj4tr2mv-dafazans-projects.vercel.app/" +
        "/products/" +
        docRef.id
    );

    // Display the document ID as text
  };

  const { Canvas } = useQRCode();
  // const logoDataURL =
  //   "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgwIiBoZWlnaHQ9IjI3NiIgdmlld0JveD0iMCAwIDM4MCAyNzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMjVfMjUxKSI+CjxwYXRoIGQ9Ik0xNjEuOTU3IDI1NS4zVjEyMy41NzNDMTYxLjk1NyAxMTIuNDg3IDE1Mi45MjggMTAzLjUgMTQxLjc5MSAxMDMuNUMxMzAuNjU0IDEwMy41IDEyMS42MjUgMTEyLjQ4NyAxMjEuNjI1IDEyMy41NzNWMjU1LjNDMTIxLjYyNSAyNjYuMzg2IDEzMC42NTQgMjc1LjM3MyAxNDEuNzkxIDI3NS4zNzNDMTUyLjkyOCAyNzUuMzczIDE2MS45NTcgMjY2LjM4NiAxNjEuOTU3IDI1NS4zWiIgZmlsbD0iIzBFNDFBMiIvPgo8cGF0aCBkPSJNMTQ2LjIwMiAyNzUuMzczSDIzNi45NDhDMjQ4LjA4NiAyNzUuMzczIDI1Ny4xMTQgMjY2LjM4NiAyNTcuMTE0IDI1NS4zQzI1Ny4xMTQgMjQ0LjIxNCAyNDguMDg2IDIzNS4yMjcgMjM2Ljk0OCAyMzUuMjI3SDE0Ni4yMDJDMTM1LjA2NSAyMzUuMjI3IDEyNi4wMzYgMjQ0LjIxNCAxMjYuMDM2IDI1NS4zQzEyNi4wMzYgMjY2LjM4NiAxMzUuMDY1IDI3NS4zNzMgMTQ2LjIwMiAyNzUuMzczWiIgZmlsbD0iIzBFNDFBMiIvPgo8cGF0aCBkPSJNNDIuNzc4MSAyNDYuODIyTDEzMy4zMTIgMTU2LjcwNkMxNDEuMTg4IDE0OC44NjcgMTQxLjE4OCAxMzYuMTU3IDEzMy4zMTIgMTI4LjMxOEMxMjUuNDM3IDEyMC40OCAxMTIuNjY5IDEyMC40OCAxMDQuNzk0IDEyOC4zMThMMTQuMjU5MyAyMTguNDM1QzYuMzg0MDUgMjI2LjI3NCA2LjM4NDA1IDIzOC45ODMgMTQuMjU5MyAyNDYuODIyQzIyLjEzNDUgMjU0LjY2MSAzNC45MDI5IDI1NC42NjEgNDIuNzc4MSAyNDYuODIyWiIgZmlsbD0iIzBFNDFBMiIvPgo8cGF0aCBkPSJNMjU5LjYzNSAwSDE0MS43OTFDMTMwLjY1NCAwIDEyMS42MjUgOC45ODY4NyAxMjEuNjI1IDIwLjA3MjdDMTIxLjYyNSAzMS4xNTg2IDEzMC42NTQgNDAuMTQ1NSAxNDEuNzkxIDQwLjE0NTVIMjU5LjYzNUMyNzAuNzcyIDQwLjE0NTUgMjc5LjgwMSAzMS4xNTg2IDI3OS44MDEgMjAuMDcyN0MyNzkuODAxIDguOTg2ODcgMjcwLjc3MiAwIDI1OS42MzUgMFoiIGZpbGw9IiMyQUJERkIiLz4KPHBhdGggZD0iTTE0MS43OTEgMTAzLjVIMjguOTg4NkMxNy44NTEzIDEwMy41IDguODIyNzUgMTEyLjQ4NyA4LjgyMjc1IDEyMy41NzNDOC44MjI3NSAxMzQuNjU5IDE3Ljg1MTMgMTQzLjY0NSAyOC45ODg2IDE0My42NDVIMTQxLjc5MUMxNTIuOTI5IDE0My42NDUgMTYxLjk1NyAxMzQuNjU5IDE2MS45NTcgMTIzLjU3M0MxNjEuOTU3IDExMi40ODcgMTUyLjkyOSAxMDMuNSAxNDEuNzkxIDEwMy41WiIgZmlsbD0iIzJBQkRGQiIvPgo8cGF0aCBkPSJNMTYxLjk1NyAxMjMuNTczVjIwLjA3MjdDMTYxLjk1NyA4Ljk4Njg3IDE1Mi45MjggMCAxNDEuNzkxIDBDMTMwLjY1NCAwIDEyMS42MjUgOC45ODY4NyAxMjEuNjI1IDIwLjA3MjdWMTIzLjU3M0MxMjEuNjI1IDEzNC42NTkgMTMwLjY1NCAxNDMuNjQ1IDE0MS43OTEgMTQzLjY0NUMxNTIuOTI4IDE0My42NDUgMTYxLjk1NyAxMzQuNjU5IDE2MS45NTcgMTIzLjU3M1oiIGZpbGw9IiMyQUJERkIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMjkuMzg2IDc2LjQ4NjVIMjY2LjU5N0gyOTQuOTQ3QzM0MS45MiA3Ni40ODY1IDM4MCAxMTQuMzkgMzgwIDE2MS4xNDZWMTkxLjEzQzM4MCAyMzcuODg2IDM0MS45MiAyNzUuNzkgMjk0Ljk0NyAyNzUuNzlIMjY2LjU5N0gyMjkuMzg2Vjc2LjQ4NjVaTTI5NC44NzcgMjM1LjIxNkgyNjkuNTI3VjExOC4yMjFIMjk0Ljg3N0MzMTkuMzQyIDExOC4yMjEgMzM5LjE3NSAxMzcuOTYyIDMzOS4xNzUgMTYyLjMxNFYxOTEuMTIyQzMzOS4xNzUgMjE1LjQ3NCAzMTkuMzQyIDIzNS4yMTYgMjk0Ljg3NyAyMzUuMjE2WiIgZmlsbD0iIzJBQkRGQiIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzEyNV8yNTEiPgo8cmVjdCB3aWR0aD0iMzgwIiBoZWlnaHQ9IjI3NiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";

  // const handleDownloadClick = () => {
  //   downloadElementAsPNG("qrCodeContainer", "qr_" + textQr + ".png");
  // };

  const [qrcolor] = useState("#010599"); // Six-character hex string
  const [qrcolorOut] = useState("#ffffff");

  const [textQr, setTextQr] = useState("text");

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  return (
    <>
      <div className="flex flex-col p-5">
        <div className="z-30 bg-[#282828] border border-[#777777] rounded-md p-5 gap-3 flex flex-col">
          <p className="text-[#ffffff] font-bold text-xl">QR CODE GENERATOR</p>
          <div className="flex gap-3">
            <div className="bg-white p-3 rounded-md w-full flex flex-col gap-3 justify-between">
              <div className="flex flex-col gap-1 text-red-500">
                <p>Nama Produk</p>
                <input
                  id="outlined-multiline-static"
                  className="border-2 rounded-md border-red-500 p-1 "
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 text-red-500">
                <p>Tipe Produk</p>
                <input
                  id="outlined-multiline-static"
                  className="border-2 rounded-md border-red-500 p-1 "
                  onChange={(e) => setTipe(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 text-red-500">
                <p>Harga Produk</p>
                <input
                  id="outlined-multiline-static"
                  className="border-2 rounded-md border-red-500 p-1 "
                  onChange={(e) => setHarga(e.target.value)}
                  required
                />
              </div>
              <button
                className="bg-blue-500 w-full rounded-md p-2 text-white font-semibold"
                onClick={addData}
              >
                SAVE AND GENERATE
              </button>
            </div>
            <div className="bg-white rounded-md p-3 ">
              <div ref={printRef}>
                <Canvas
                  text={textQr}
                  options={{
                    errorCorrectionLevel: "M",
                    margin: 3,
                    scale: 4,
                    width: 200,
                    color: {
                      dark: qrcolor,
                      light: qrcolorOut,
                    },
                  }}
                />
              </div>

              <button
                className="bg-blue-500 w-full rounded-md p-2 text-white font-semibold"
                onClick={handlePrint}
              >
                PRINT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QrGenerator;
