// Fetch Data
const fetchData = fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=pasta")
  .then((res) => res.json())
  .then((data) => {
    showData(data.meals);
    return data.meals;
  })

// Output Data
function showData(data) {
  const menu = document.getElementById('menu-list');
  data.forEach(item => {
    const link = document.createElement('a');
    link.href = `recipes/${item.strMeal}`;

    const container = document.createElement('div');
    container.className = "menu-item";

    const image = document.createElement('img');
    image.className = "item-img";
    image.loading = "lazy";
    image.src = item.strMealThumb;

    const title = document.createElement('p');
    title.className = "item-title";
    title.innerText = item.strMeal;

    container.appendChild(image);
    container.appendChild(title);
    link.appendChild(container);
    menu.appendChild(link);
  });
}

// Reset Search
async function handleReset() {
  // Reset now showed menus
  document.getElementById("search-input").value = "";
  const node = document.getElementById('menu-list');
  node.replaceChildren();

  // Add default menus
  const data = await fetchData;
  showData(data);
}

// Update Search Filter
async function handleFilter(event) {
  // Reset now showed menus
  const node = document.getElementById('menu-list');
  node.replaceChildren();

  // Filter new menu
  const oldData = await fetchData;
  const newData = oldData.filter((data) => {
    const dataTitle = data.strMeal.toLowerCase();
    const searchInput = event.target.value.toLowerCase();
    return dataTitle.includes(searchInput);
  })
  showData(newData);
}