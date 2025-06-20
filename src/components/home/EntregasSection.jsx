import { Link } from "react-router-dom"; // si usas React Router
import React from "react";

export const EntregasSection = ({ dataList }) => {
  if (!Array.isArray(dataList)) return null; // o puedes retornar un loader

  const groupedData = dataList.reduce((acc, item) => {
    const category = item.categoria?.trim() || "Otras entregas";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <section className="w-full px-8 py-12 bg-black text-white space-y-10">
      {Object.entries(groupedData).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map((item, i) => (
              <Link
                to={`/entrega/${item.slug}`}
                key={i}
                className="relative group rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={item.imgBackgroundMakingOf}
                  alt={item.titulo}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-2 py-1">
                  <p className="text-sm font-semibold truncate">{item.titulo}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};