import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipieList from "./RecipieList";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((res) => setRecipes(res.data.recipes))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const filteredRecipes = selectedCuisine
    ? recipes.filter((recipe) => recipe.cuisine === selectedCuisine)
    : recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-yellow-200 to-orange-700 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">🍽️ Welcome to Recipe World!</h1>
        <p className="mt-2 text-lg">
          Find the best recipes for your next meal.
        </p>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-between px-6 mt-6">
        <input
          type="text"
          placeholder="Search for a recipe..."
          className="w-full md:w-1/2 p-3 border border-orange-500 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-orange-500 
             placeholder-orange-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-4 md:mt-0">
          <RecipieList
            recipes={recipes}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
          />
        </div>
      </div>

      <section className="p-6">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">
          {selectedCuisine
            ? `🍜 ${selectedCuisine} Recipes`
            : "🍜 Featured Recipes"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-3">{recipe.name}</h3>
              <div className="flex justify-between w-full">
                <p className="text-gray-600">⏳ {recipe.cookTimeMinutes} min</p>
                <p className="text-gray-600">⭐ {recipe.rating}</p>
              </div>

              <Link to={`/recipe/${recipe.id}`} className="mt-3 w-full">
                <button className="w-[30%] bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  View Recipe
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
