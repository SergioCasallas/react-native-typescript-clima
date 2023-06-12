const getLocationInfo = async(location)=>{
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b743d14e7fe01e0633a128d4bc2d2c90&units=metric`;
   const response = await fetch(url)
  .then((response) => response.json())
  // console.log(response.coord)
  return response
}


export {getLocationInfo}