


function getUserLocation(){

    return new Promise((resolve,reject) =>{
      if (!navigator.geolocation){
        reject(new Error('Geolocation not enabled in browser'));
      }
    // gets users coordinates
    navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    resolve({lat,lng});
    },
    error => {
    console.log("Error finding location", error);
    reject(new Error(`Location error ${error.message}`));
       }
     );
   }
 );
}

let getUserInput = ()=>{

  let searchInput = document.getElementById("searchInput");

  let query = searchInput.value;

  if (!query){
    console.log("No Query");
  }

  return query;

}


async function queryServer(lat,lng,query){

  const url = `http://127.0.0.1:8000/search?query=${encodeURIComponent(query)}&lat=${lat}&lng=${lng}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch(error){
    console.error(error);
    return [];
  }

}

let displayResults = (data) => {
  let listOfResults = document.querySelector(".results");
  listOfResults.textContent = "";
  
  if (!(Object.keys(data).length === 0)){
    data.forEach(place => {
      const li = document.createElement("li");
      let is_open = place.open_now ? "Is Open Now":"Is Closed";
      li.textContent = `${place.name} - ${place.address} - ${is_open} - ${place.rating}`;
      listOfResults.appendChild(li);

    });
  }
  else{
    const h2 = document.createElement("h2");
    h2.textContent = "No results found";
    listOfResults.appendChild(h2);
  }

};






async function searchFood(query) {
  try{
    let {lat,lng} = await getUserLocation();

    let results = await queryServer(lat,lng,query);

    displayResults(results);
  }
  catch(error){
    console.log(error);
    displayResults([]);
  }
}

let searchBtn = document.querySelector(".searchBtn");

// carries out search
searchBtn.addEventListener("click",(e) => {
  e.preventDefault();
  searchFood(getUserInput());

})
