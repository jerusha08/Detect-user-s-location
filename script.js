let locationButton = document.getElementById("view-location");
let locationDiv = document.getElementById("about-location");

function showCurrentDate() {
  const currentDateElement = document.getElementById("current-Date");
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  currentDateElement.textContent = `Date: ${formattedDate}`;
}
locationButton.addEventListener("click", showCurrentDate);

function showCurrentTimeWithRunningTime() {
  const currentTimeElement = document.getElementById("current-Time");

  function updateCurrentTime() {
    const currentDateTime = new Date();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();
    const formattedHours = (hours < 10 ? "0" : "") + hours;
    const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
    const formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    currentTimeElement.textContent = `Time: ${formattedTime}`;
  }

  // Initial call to set the time
  updateCurrentTime();

  // Update the time every second
  const timer = setInterval(updateCurrentTime, 1000);

  // Stop the timer after 10 seconds (optional)
  setTimeout(() => {
    clearInterval(timer);
  }, 10000);
}
locationButton.addEventListener("click", showCurrentTimeWithRunningTime);

locationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    locationDiv.innerText = "The browser does not support geolocation";
  }
});
const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.innerText = "Please allow access to location";
      break;
    case error.POSITION_UNAVAILABLE:
      //usually fired for firefox
      locationDiv.innerText = "Location Information unavailable";
      break;
    case error.TIMEOUT:
      locationDiv.innerText = "The request to get user location timed out";
  }
};

const showLocation = async (position) => {
  //We user the NOminatim API for getting actual addres from latitude and longitude
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  //store response object
  let data = await response.json();
  locationDiv.innerText = `${data.address.county}, ${data.address.country}`;
};
