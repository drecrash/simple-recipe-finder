import React, { useEffect, useState, useMemo } from "react";
import { createRecipe } from "./graphql/mutations";
import { listRecipes } from "./graphql/queries"
import { generateClient } from "@aws-amplify/api";

const client = generateClient();

export default function GetRecipe() {

    const convertStringToArray = (input_string) =>{
        let ingredient_list = input_string.split(",")
        ingredient_list = ingredient_list.map((list_item)=>{
            list_item = list_item.trim()
            list_item = list_item.replace(" ", "-")
            list_item = list_item.toLowerCase()
            return list_item
        })
        return ingredient_list
    }
        

    async function getAllRecipes(){
        const response = await client.graphql({
            query: listRecipes
        })
        setRecipes(response.data.listRecipes.items)
      }
    
      const filterRecipes = () =>{
        let filtered_recipes = recipes.filter((recipe)=>{
            let recipe_ingredients = recipe["ingredients"]
            return ingredientList.every(ing=>recipe_ingredients.includes(ing))
        })
        return filtered_recipes
    
      }
        
    
      const onUpdateList = (e) => {
        setIngredientListString(e.target.value);
      };
            
    const [ingredientListString, setIngredientListString] = useState("");

    const ingredientList = useMemo(()=>convertStringToArray(ingredientListString), [ingredientListString])

    const [recipes, setRecipes] = useState([])

    const useableRecipes = useMemo(()=>filterRecipes())

    useEffect(()=>{
        getAllRecipes()
    }, [])

  return (
    <div>
      <h2>Search Recipe</h2>
      <a href="./add">add recipe</a>

      <h3>Ingredients</h3>

      <textarea
        onChange={(e)=>{onUpdateList(e)}}
        placeholder="List of ingredients, separated by commas"
        />
    
      <br />

      <ul>
      {

        useableRecipes.map((recipe, i)=>{
            return(
            
            
              <li key={i}>

                <p>{recipe.name}: {recipe.description}</p>
                
                <ul>
                    {
                        (recipe.ingredients).map((ing, j)=>{
                            return(
                                <li key={j}>
                                    {ing}
                                </li>
                            )
                        })
                    }
                </ul>

              </li>)

        })
        


    }
      </ul>
    </div>
  );
}
