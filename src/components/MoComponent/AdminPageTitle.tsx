import React from "react";

function AdminPageTitle({ title }: { title: string }) {
  return <h1 className="text-lg font-bold text-[#333] uppercase">{title}</h1>;
}

export default AdminPageTitle;
