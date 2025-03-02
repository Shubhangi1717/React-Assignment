import React, { useState } from "react";

const RecipieList = ({ recipes, selectedCuisine, setSelectedCuisine }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">
        🍽️ Select a Cuisine
      </h1>

      <div className="flex justify-center mb-6 relative">
        <div className="relative w-72">
          <div
            className="w-full p-3 border-2 border-orange-500 rounded-lg bg-orange-100 text-orange-600 
                      cursor-pointer flex justify-between items-center shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedCuisine || "-- Select Cuisine --"}
            <span className="text-orange-500">⌄</span>
          </div>

          {isOpen && (
            <div className="absolute w-full text-orange-600  bg-white border border-orange-500 rounded-lg shadow-lg mt-2 z-10 h-[230px] overflow-auto">
              <div
                className="px-4 py-2 cursor-pointer hover:bg-orange-100"
                onClick={() => {
                  setSelectedCuisine("");
                  setIsOpen(false);
                }}
              >
                -- All Cuisines --
              </div>
              {cuisines.map((cuisine) => (
                <div
                  key={cuisine}
                  className={`px-4 py-2 flex items-center cursor-pointer hover:bg-orange-100 
                    ${selectedCuisine === cuisine ? "bg-orange-500 text-white" : "text-orange-600"}`}
                  onClick={() => {
                    setSelectedCuisine(cuisine);
                    setIsOpen(false);
                  }}
                >
                  {cuisine}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipieList;
