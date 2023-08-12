import React from "react";

function ListCard({title, list }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ol className="list-decimal pl-6">
        {list.map((item, index) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ListCard;
