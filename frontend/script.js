

async function searchFood() {
const query =  document.getElementById("foodQuery").value;
const lat = 42.18383
const lng = -71.03
const url = `http://127.0.0.1:8000/search?query=${query}&lat=${lat}&lng=${lng}`;


try{
  const response = await fetch(url);
  const data = await response.json();

  const listOfResults = document.getElementById("results")
  listOfResults.innerHTML = "";
  if (data && data.results && Array.isArray(data.results) && data.results.length > 0)
  {data.forEach(place => {
    const li = document.createElement("li");
    li.textContent = `${place.name} - ${place.address}`;
    listOfResults.appendChild(li);
  });
}
else{
  const li = document.createElement("li");
  li.textContent = "No results Found";
  listOfResults.appendChild(li)
}
}
catch(error)
{
  const listOfResults = document.getElementById("results");
  listOfResults.innerHTML = "<li>error loading results</li>"
  console.error("Error fetching food ",error)

}

}


const query = "soup"

