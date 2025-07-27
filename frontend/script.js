const url = `http://127.0.0.1:8000/search?query=${query}&lat=${lat}&lng=${lng}`;


try{
  const response = await fetch(url);
  const data = await response.json();

  const listOfResults = document.getElementById("result")
  listOfResults.innerHTML = "";

  data.array.forEach(place => {
    const li = document.createElement("li");
    li.textContent = `${place.name} - ${place.address}`;
    listOfResults.appendChild(li)
  });
}
catch(error)
{
  console.error("Error fetching food ",error)

}



const query = "soup"
const lat = 42.18383
const lng = -71.03
