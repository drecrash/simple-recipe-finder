import React, { useState } from "react";
import { createRecipe } from "./graphql/mutations";
import { generateClient } from "@aws-amplify/api";

const client = generateClient();

async function addRecipe(name, ingredients, description = "") {
  const data = {
    name: name,
    ingredients: ingredients,
    description: description
  };


  const newRecipe = await client.graphql({
    query: createRecipe,
    variables: {input: data},
  });
  console.log("Added recipe:", newRecipe);
}

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientData, setIngredientData] = useState([]);

  const onAdd = () => {
    setIngredientData([...ingredientData, ""]);
  };

  const onChangeIngredient = (e, index) => {
    const updatedIngredients = [...ingredientData];
    updatedIngredients[index] = e.target.value;
    setIngredientData(updatedIngredients);
  };

  const onDelete = (index) => {
    const updatedIngredients = [...ingredientData];
    updatedIngredients.splice(index, 1);
    setIngredientData(updatedIngredients);
  };

  const onSubmit = () => {
    addRecipe(name, ingredientData.filter(ing => ing.trim() !== "").map(ing => ing.toLowerCase().replace(/\s+/g, "-")), description);
    
    setName("");
    setDescription("");
    setIngredientData([]);
  };

  return (
    <div>
      <a href="./">search</a>
      <h2>New Recipe</h2>
      
      <label>
        Name:
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter recipe name"
        />
      </label>
      <br />

      <label>
        Description:
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter description*"
        />
      </label>
      <br />

      <h3>Ingredients</h3>
      <button onClick={onAdd}>Add Ingredient</button>
      
      {ingredientData.map((ingredient, index) => (
        <div key={index}>
          <input 
            type="text" 
            value={ingredient} 
            onChange={(e) => onChangeIngredient(e, index)} 
            placeholder={`Ingredient ${index + 1}`}
          />
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}

      <br />
      <button onClick={onSubmit}>Submit Recipe</button>
    </div>
  );
}
