// Get ID from link
const id = window.location.pathname
  .replace("/recipes/", "")
  .replace(".html", "");

// Fetch Data
const fetchData = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((res) => res.json())
  .then((data) => {
    const food = data.meals[0]

    // Head
    document.title = food.strMeal;
    document.querySelector('meta[name="title"]').setAttribute("content", `${food.strMeal} Recipe`);
    document.querySelector('meta[property="og:title"]').setAttribute("content", `${food.strMeal} Recipe`);
    document.querySelector('meta[property="og:image"]').setAttribute("content", food.strMealThumb);

    // Title
    document.getElementById("title").innerText = food.strMeal;

    // Image
    document.getElementById("item-img").src = food.strMealThumb;

    // Ingredients
    const parentIngredientsNode = document.getElementById("ingredients");
    for (let i = 1; food[`strIngredient${i}`] && food[`strMeasure${i}`]; i++) {
      const li = document.createElement('li');
      li.innerText = `${food[`strMeasure${i}`]} ${food[`strIngredient${i}`]}`;
      parentIngredientsNode.appendChild(li);
    }

    // Recipe
    const parentRecipeNode = document.getElementById("recipe");
    let fetchInstruction = food.strInstructions;
    
    // Clean the instruction
    fetchInstruction = fetchInstruction.replace("Make the mac and cheese\r\n\r\n", "")
    fetchInstruction = fetchInstruction.replace("Make the grilled cheese\r\n", "")
    fetchInstruction = fetchInstruction.replace("\r\n\r\nNutrition Facts\r\n1 sandwich: 445 calories, 24g fat (12g saturated fat), 66mg cholesterol, 1094mg sodium, 35g carbohydrate (3g sugars, 2g fiber), 21g protein.", "")
    for (let i = 1; i < 25; i++) {
      fetchInstruction = fetchInstruction.replace(`${i}. `, "")
      fetchInstruction = fetchInstruction.replace(`STEP ${i}\r\n`, "")
    }
    // Convert to array
    let instructions;
    if (fetchInstruction.includes("\r\n")) {
      instructions = fetchInstruction.split("\r\n\r\n").join("\r\n").split("\r\n");
    } else {
      instructions = fetchInstruction.split(". ");
    }
    // Print instructions
    instructions.forEach((item) => {
      const li = document.createElement('li');
      li.innerText = item;
      parentRecipeNode.appendChild(li);
    })
  });