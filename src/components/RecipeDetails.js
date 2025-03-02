import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load recipe details");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center bg-orange-100 min-h-screen p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-red-600 text-center">
          {recipe.name}
        </h2>

        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-md mt-3 shadow-md"
        />

        <div className="mt-4 flex flex-wrap justify-between text-gray-700">
          <p className="flex items-center">
            ⏳ <span className="ml-1">{recipe.cookTimeMinutes} min</span>
          </p>
          <p className="flex items-center">
            🍽 <span className="ml-1">{recipe.cuisine} Cuisine</span>
          </p>
          <p className="flex items-center">
            🍛 <span className="ml-1">{recipe.servings} Servings</span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 justify-center text-gray-700">
          <p className="bg-gray-200 px-3 py-1 rounded-lg font-semibold">
            ⚡ {recipe.difficulty} Difficulty
          </p>
          <p className="bg-gray-200 px-3 py-1 rounded-lg font-semibold">
            🔥 {recipe.caloriesPerServing} Calories/Serving
          </p>
          <p className="bg-gray-200 px-3 py-1 rounded-lg font-semibold">
            🍽️ {recipe.mealType.join(", ")}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center">
          ⭐{" "}
          <span className="text-lg font-bold text-gray-700 ml-1">
            {recipe.rating}
          </span>
          <span className="text-gray-600 ml-2">
            ({recipe.reviewCount} reviews)
          </span>
        </div>

        <h3 className="text-xl font-bold text-orange-600 mt-6">
          🍽 Ingredients:
        </h3>
        <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 justify-center text-gray-700">
          {recipe.ingredients.map((ingredient, index) => (
            <p
              key={index}
              className="bg-orange-100 px-3 py-1 rounded-lg font-semibold shadow-md"
            >
              {ingredient}
            </p>
          ))}
        </div>

        <h3 className="text-xl font-bold text-orange-600 mt-6">
          📝 Instructions:
        </h3>
        <ol className="list-decimal list-inside text-gray-700 mt-3 space-y-2">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="bg-orange-100 px-3 py-2 rounded-md">
              {step}
            </li>
          ))}
        </ol>

        <button
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full text-center"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
