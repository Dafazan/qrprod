import React from "react";

function Sidebar() {
  return (
    <div className="p-5 bg-red-500 w-1/6 min-h-screen ">
      <div className="flex flex-col gap-2 text-white font-semibold uppercase fixed">
        <a className="hover:text-red-200" href="/">
          Add New
        </a>
        <a className="hover:text-red-200" href="/products">
          Products List
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
