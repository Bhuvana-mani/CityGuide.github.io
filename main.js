
const clientId = 'Z5LF2CSGKJL14JPWPXYIVGAYSDUTDEGLO1AN1L0D1MDJPDCE';
const clientSecret = 'NXL32JB4FU5LVBKQUDZEH5HSTVDLMBAICKT1NSIGYLRQKDFK';
const url = 'https://api.foursquare.com/v2/venues/explore?&near=';


const openWeatherKey = '932c9d3facf439907b22af82f5395a57';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';


const input = document.getElementById('city');
const submit = document.getElementById('button');
const destination = document.getElementById('destination');
const container = document.getElementsByClassName('container');
const venueDivs = Array.from(document.getElementsByClassName("venue"));
const venuesContainer=document.getElementById("venues");
const weatherContainer = document.getElementById("weather");
submit.addEventListener("click",(event) => {
  event.preventDefault();
 executeSearch();
});

const getVenues= async () => {
  const city = input.value;
  const urlToFetchFoursq = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210301`;

  try {
    const response = await fetch(urlToFetchFoursq);
   if (response.ok){
    const jsonResponse = await response.json();
    const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
    console.log(venues);
    return venues;
   }
 }
  catch(error){
  console.log(error);
  }
};

const getForecast = async () => {

 const urlToFetchWeat = `${weatherUrl}?&q=${input.value}&APPID=${openWeatherKey}`;
  
  try {
     const response = await fetch(urlToFetchWeat);
     if (response.ok){
     const jsonResponse = await response.json();
     return jsonResponse;

    }
  }
  catch(error){
    console.log(error);
  }

};
function drawVenues (venues) {
  venues.forEach((venue, index) => {
   const venueIcon = venue.categories[0].icon;
   const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
   let venueContent = createVenueHTML(venue.name,venue.categories[0], venue.location, venueImgSrc);
   const venueDiv=document.createElement("div");
   venueDiv.classList.add("venue");
   venueDiv.innerHTML=venueContent;
   venuesContainer.appendChild(venueDiv);
  });
 

}
 function drawWeather (weather) {
   let weatherContent = createWeatherHTML(weather);
    const weatherDiv=document.createElement("div");
    weatherDiv.classList.add("weather");
   weatherDiv.innerHTML=weatherContent;
   weatherContainer.appendChild(weatherDiv);
} 
function executeSearch ()  {
  weatherContainer.innerHTML="";
  venuesContainer.innerHTML="";
 // container.css("visibility", "visible");
  getVenues().then(venues => drawVenues(venues));
 getForecast().then(weather => drawWeather(weather));
  return false;
}
function myweatherinfo(){
  const checkbox=document.getElementById("weather_info");
  const text=document.getElementById("weather");
  const othertext=document.getElementById("venues");
  if(checkbox.checked==true){
    text.style.visibility="visible";
    othertext.style.visibility="hidden";
  }
  else{
    text.style.visibility="hidden";
    othertext.style.visibility="hidden";
  }
} 
function myvenueinfo(){
  const checkbox=document.getElementById("venue_info");
  const text=document.getElementById("venues");
  const othertext=document.getElementById("weather");
  if(checkbox.checked==true){
    text.style.visibility="visible";
    othertext.style.visibility="hidden";
  }
  else{
    text.style.visibility="hidden";
    othertext.style.visibility="hidden";
  }
}

function myalfaorder(){
  venues.sort(function(x,y){
    let a=x.name.toUpperCase(),
    b=y.name.toUpperCase();
    return a == b ? 0 : a > b ? 1 : -1;
  });
  
}

