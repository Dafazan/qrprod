// "use client";
// import React, { useState, useRef } from "react";
// import { useQRCode } from "next-qrcode";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/app/db/firebase";
// import Sidebar from "@/components/sidebar";
// import html2canvas from "html2canvas";

// function QrGenerator() {
//   const [nama, setNama] = useState<string>("");
//   const [tipe, setTipe] = useState<string>("");
//   const [harga, setHarga] = useState<string>("");

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const addData = async (e: any) => {
//     e.preventDefault();

//     const docRef = await addDoc(collection(db, "produk"), {
//       nama: nama,
//       tipe: tipe,
//       harga: harga,
//     });

//     //const documentId = docRef.id;
//     setTextQr("qrprod.vercel.app/" + docRef.id);
//   };

//   const { Canvas } = useQRCode();
//   const logoDataURL =
//     "";

//   async function downloadElementAsPNG(elementId: string, fileName: string) {
//     const element = document.getElementById(elementId);

//     if (!element) {
//       console.error(`Element with id ${elementId} not found.`);
//       return;
//     }

//     try {
//       // Use html2canvas to create a canvas image from the element
//       const canvas = await html2canvas(element, {
//         foreignObjectRendering: true,
//       });

//       // Convert the canvas to a data URL representing a PNG image
//       const dataURL = canvas.toDataURL("image/png");

//       // Create a link element for downloading
//       const downloadLink = document.createElement("a");
//       downloadLink.href = dataURL;
//       downloadLink.download = fileName;

//       // Append the link to the document and trigger a click to start the download
//       document.body.appendChild(downloadLink);
//       downloadLink.click();

//       // Clean up by removing the link from the document
//       document.body.removeChild(downloadLink);
//     } catch (error) {
//       console.error("Error generating PNG:", error);
//     }
//   }

//   const handleDownloadClick = () => {
//     downloadElementAsPNG("qrCodeContainer", "qr_" + textQr + ".png");
//   };

//   const [qrcolor] = useState("#ef4444"); // Six-character hex string
//   const [qrcolorOut] = useState("#ffffff");

//   const [textQr, setTextQr] = useState("text");

//   const printRef = useRef<HTMLDivElement>(null);

//   // const handlePrint = () => {
//   //   if (printRef.current) {
//   //     const printContents = printRef.current.innerHTML;
//   //     const originalContents = document.body.innerHTML;
//   //     document.body.innerHTML = printContents;
//   //     window.print();
//   //     document.body.innerHTML = originalContents;
//   //   }
//   // };

//   return (
//     <>
//       <div className="relative w-full">
//         <div className="flex w-full absolute">
//           <Sidebar />
//           <div className="w-full flex flex-col p-5">
//             <div className="z-30 bg-red-500  rounded-md p-5 gap-3 flex flex-col">
//               <p className="text-[#ffffff] font-bold text-xl">
//                 QR CODE GENERATOR
//               </p>
//               <div className="flex gap-3">
//                 <div className="bg-white p-3 rounded-md w-full flex flex-col gap-3 justify-between">
//                   <div className="flex flex-col gap-1 text-red-500">
//                     <p>Product Name</p>
//                     <input
//                       id="outlined-multiline-static"
//                       className="border-2 rounded-md border-red-500 p-1 "
//                       onChange={(e) => setNama(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col gap-1 text-red-500">
//                     <p>Product Type</p>
//                     <input
//                       id="outlined-multiline-static"
//                       className="border-2 rounded-md border-red-500 p-1 "
//                       onChange={(e) => setTipe(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="flex flex-col gap-1 text-red-500">
//                     <p>Price</p>
//                     <input
//                       id="outlined-multiline-static"
//                       className="border-2 rounded-md border-red-500 p-1 "
//                       onChange={(e) => setHarga(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <button
//                     className="bg-red-500 w-full rounded-md p-2 text-white font-semibold"
//                     onClick={addData}
//                   >
//                     SAVE AND GENERATE
//                   </button>
//                 </div>
//                 <div className="bg-white rounded-md p-3 ">
//                   <div ref={printRef}>
//                     <div
//                       id="canvasContainer"
//                       className="w-[200px] h-[200px] flex top-0 relative rounded-lg"
//                     >
//                       <Canvas
//                         text={textQr}
//                         options={{
//                           errorCorrectionLevel: "M",
//                           margin: 3,
//                           scale: 4,
//                           width: 200,
//                           color: {
//                             dark: qrcolor,
//                             light: qrcolorOut,
//                           },
//                         }}
//                       />
//                       <div className="w-[200px] h-[200px] flex items-center justify-center absolute rounded-lg">
//                         <div className="bg-[#ffffff] p-[2px] w-14 ">
//                           <img src={logoDataURL} alt="" />
//                         </div>
//                       </div>
//                     </div>

//                     <p>{textQr}</p>
//                   </div>

//                   <button
//                     className="bg-red-500 w-full rounded-md p-2 text-white font-semibold"
//                     onClick={handleDownloadClick}
//                   >
//                     PRINT
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute">
//           <div
//             id="qrCodeContainer"
//             className="w-[200px] h-[200px] flex top-0 relative rounded-lg"
//           >
//             <Canvas
//               text={textQr}
//               options={{
//                 errorCorrectionLevel: "M",
//                 margin: 3,
//                 scale: 4,
//                 width: 200,
//                 color: {
//                   dark: qrcolor,
//                   light: qrcolorOut,
//                 },
//               }}
//             />
//             <div className="w-[200px] h-[200px] flex items-center justify-center absolute rounded-lg">
//               <div className="bg-[#ffffff] p-[2px] w-14 ">
//                 <img src={logoDataURL} alt="" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default QrGenerator;

"use client";
import React, { useState } from "react";
import { useQRCode } from "next-qrcode";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/db/firebase";
import Sidebar from "@/components/sidebar";

function QrGenerator() {
  const [nama, setNama] = useState<string>("");
  const [tipe, setTipe] = useState<string>("");
  const [harga, setHarga] = useState<string>("");
  const [textQr, setTextQr] = useState("text");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [qrImage, setQrImage] = useState<string | null>(null); // State for QR image
  const [fetchedQrImage, setFetchedQrImage] = useState<string | null>(null); // For fetched QR code
  const { Canvas } = useQRCode();
  const qrcolor = "#ef4444";
  const qrcolorOut = "#ffffff";
  const logoDataURL = ""; // Your logo's base64 or URL

  const [currentDocid, setCurrentDocid] = useState<string>("");

  const addData = async (e: React.FormEvent) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "produk"), {
      nama: nama,
      tipe: tipe,
      harga: harga,
    });

    const newTextQr = "qrprod.vercel.app/" + docRef.id;
    setTextQr(newTextQr);
    setCurrentDocid(docRef.id);

    // Generate the QR image after setting the `textQr`
    setTimeout(() => {
      generateQrImage(docRef.id);
    }, 500); // Delay to ensure the QR code renders
  };

  const generateQrImage = (documentId: string) => {
    const canvasElement = document.querySelector(
      "#qrCodeCanvas canvas"
    ) as HTMLCanvasElement;

    if (!canvasElement) {
      console.error("QR code canvas not found.");
      return;
    }

    const dataURL = canvasElement.toDataURL("image/png");
    setQrImage(dataURL); // Save the image to state

    uploadQrToFirebase(documentId, dataURL);
  };

  const uploadQrToFirebase = async (documentId: string, qrImage: string) => {
    try {
      const docRef = doc(db, "produk", documentId);

      // Update the document with the QR code image URL
      await updateDoc(docRef, {
        qrImage: qrImage, // You can also save this to Firebase Storage and store the URL instead
      });

      console.log("QR code uploaded successfully!");
    } catch (error) {
      console.error("Error uploading QR code:", error);
    }
  };

  const fetchQrCode = async () => {
    try {
      console.log("Fetching QR Code...");

      // Replace this with the actual document ID from Firestore
      const documentId = currentDocid;

      const docRef = doc(db, "produk", documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Document Data:", data);

        if (data.qrImage) {
          setFetchedQrImage(data.qrImage);
          console.log("Fetched QR Code Image:", data.qrImage);
        } else {
          console.warn("No QR image found in the document.");
        }
      } else {
        console.error("Document does not exist!");
      }
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <div className="flex w-full absolute">
          <Sidebar />
          <div className="w-full flex flex-col p-5">
            <div className="z-30 bg-red-500 rounded-md p-5 gap-3 flex flex-col">
              <p className="text-[#ffffff] font-bold text-xl">
                QR CODE GENERATOR
              </p>
              <div className="flex gap-3">
                <div className="bg-white p-3 rounded-md w-full flex flex-col gap-3 justify-between">
                  <div className="flex flex-col gap-1 text-red-500">
                    <p>Product Name</p>
                    <input
                      id="outlined-multiline-static"
                      className="border-2 rounded-md border-red-500 p-1"
                      onChange={(e) => setNama(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-red-500">
                    <p>Product Type</p>
                    <input
                      id="outlined-multiline-static"
                      className="border-2 rounded-md border-red-500 p-1"
                      onChange={(e) => setTipe(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-red-500">
                    <p>Price</p>
                    <input
                      id="outlined-multiline-static"
                      className="border-2 rounded-md border-red-500 p-1"
                      onChange={(e) => setHarga(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    className="bg-red-500 w-full rounded-md p-2 text-white font-semibold"
                    onClick={addData}
                  >
                    SAVE AND GENERATE
                  </button>
                </div>
                <div className="bg-white rounded-md p-3">
                  <div className="absolute" id="qrCodeCanvas">
                    <div
                      id=""
                      className="w-[200px] h-[200px] flex top-0 relative rounded-lg"
                    >
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
                      <div className="w-[200px] h-[200px] flex items-center justify-center absolute rounded-lg">
                        <div className="bg-[#ffffff] p-[2px] w-14">
                          <img src={logoDataURL} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>{textQr}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute">
          <div
            id="qrCodeContainer"
            className="w-[200px] h-[200px] flex top-0 relative rounded-lg"
          >
            <div className="w-[200px] h-[200px] flex items-center justify-center absolute rounded-lg">
              <div className="bg-[#ffffff] p-[2px] w-14">
                <img src={logoDataURL} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Fetch QR Code Button */}
        <div className="absolute">
          <button
            onClick={fetchQrCode}
            className="z-50 bg-blue-500 text-white p-2 rounded-md"
          >
            Fetch QR Code
          </button>

          {/* Display Fetched QR Code */}
          <div className="absolute mt-5">
            {fetchedQrImage && (
              <img src={fetchedQrImage} alt="Fetched QR Code" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default QrGenerator;
