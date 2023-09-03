const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");

const city_name = document.getElementById("city_name");

const temp_real_val = document.getElementById("temp_real_val");
const temp_real_feels = document.getElementById("temp_real_feels");
const temp_real_min = document.getElementById("temp_real_min");
const temp_real_max = document.getElementById("temp_real_max");
const temp_status = document.getElementById("temp_status");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const datahide = document.querySelector(".middle_layer");

let day = document.getElementById("day");

let today_data = document.getElementById("today_data");

const currTime = document.getElementById("currTime");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = `Plz write the name before search`;
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f7a8d370890a30d4d69b416d7513a3e0`;
      const response = await fetch(url);
      const data = await response.json();
      //console.log(response);
      const arrData = [data];

      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp_real_val.innerText = `Temperature : ${arrData[0].main.temp}`;
      temp_real_feels.innerText = `Feels Like : ${arrData[0].main.feels_like}`;
      temp_real_min.innerText = `Minimum Temp : ${arrData[0].main.temp_min}`;
      temp_real_max.innerText = `Maximum Temp : ${arrData[0].main.temp_max}`;

      // code for sunrise
      var timestamp = `${arrData[0].sys.sunrise}`;
      // Create a new Date object using the timestamp (multiply by 1000 for milliseconds)
      const date = new Date(timestamp * 1000);

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      // Format the time as HH:MM:SS AM/PM
      const formattedTime = `${hours}:${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      } ${hours >= 12 ? "PM" : "AM"}`;

      sunrise.innerText = `Sunrise : ${formattedTime}`;

      // code for sunset
      var stamp = `${arrData[0].sys.sunset}`;
      // Create a new Date object using the timestamp (multiply by 1000 for milliseconds)
      const ate = new Date(stamp * 1000);

      const hrss = ate.getHours();
      const min = ate.getMinutes();
      const sec = ate.getSeconds();

      // Format the time as HH:MM:SS AM/PM
      const formatedTime = `${hrss}:${min}:${sec < 10 ? "0" + sec : sec} ${
        hrss >= 12 ? "PM" : "AM"
      }`;

      sunset.innerText = `Sunset : ${formatedTime}`;

      const tempMood = arrData[0].weather[0].main;
      console.log(tempMood);

      let nowTime = new Date();
      let hrs = nowTime.getHours();
      // console.log(hrs);

      //*************************************************************************************//
      // condition to check clear, cloudy and rainy.
      if (tempMood === "Clear" && (hrs >= 18 || hrs < 5)) {
        temp_status.innerHTML =
          "<i class='fa-solid fa-moon fa-beat fa-2xl' style='color: #deec74;'></i>";
      } else if (tempMood === "Clear" && (hrs < 18 || hrs >= 5)) {
        temp_status.innerHTML =
          "<i class='fa-solid fa-sun fa-beat fa-2xl' style='color: #deed02;'></i>";
      } else if (tempMood === "Thunderstorm") {
        temp_status.innerHTML =
          "<i class='fa-solid fa-cloud-bolt fa-beat fa-2xl'></i>";
      } else if (
        (tempMood === "Rain" || tempMood === "Drizzle") &&
        (hrs < 18 || hrs >= 5)
      ) {
        temp_status.innerHTML =
          "<i class='fa-solid fa-cloud-sun-rain fa-2xl'></i>";
      } else if (
        (tempMood === "Rain" || tempMood === "Drizzle") &&
        (hrs >= 18 || hrs < 5)
      ) {
        temp_status.innerHTML =
          "<i class='fa-solid fa-cloud-moon-rain fa-2xl'></i>";
      } else if (tempMood === "Snow") {
        temp_status.innerHTML =
          "<i class='fa-solid fa-snowflake fa-beat-fade fa-2xl' style='color: #a7a7c3;'></i>";
      } else {
        if (hrs >= 18 || hrs < 5) {
          temp_status.innerHTML =
            "<i class='fa-solid fa-cloud-moon fa-beat fa-2xl'></i>";
        } else {
          temp_status.innerHTML =
            "<i class='fa-solid fa-cloud-sun fa-beat fa-2xl'></i>";
        }
      }

      datahide.classList.remove("data_hide");
    } catch {
      city_name.innerText = `Plz enter the city name properly`;
      datahide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);

//*************************************************************************************//
// here we do code for day, date and time.
const getCurrentDay = () => {
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentTime = new Date();
  // console.log(currentTime);
  // console.log(currentTime.getDay());
  days = weekday[currentTime.getDay()];
  // console.log(days);

  // let day = document.getElementById("day"); this code is move to top

  day.innerText = days;
};

const getCurrentDate = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();

  const formattedDate = `${day} ${months[monthIndex]}`;
  // let today_data = document.getElementById("today_data"); this code is move to top

  today_data.innerText = formattedDate;
};

const getCurrentTime = () => {
  let now = new Date();
  let hours = now.getHours();
  let mins = now.getMinutes();
  let sec = now.getSeconds();
  // console.log(hours);

  let amorpm = "AM";

  if (hours > 11) {
    amorpm = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }

  currTime.innerText = `${hours}:${mins}:${sec} ${amorpm}`;
};
setInterval(getCurrentTime, 1000);

getCurrentDay();
getCurrentTime();
getCurrentDate();

// put this api in google search box and see all the details
// here we set kolkata as default if we want we can change.
// http://api.openweathermap.org/data/2.5/weather?q=kolkata&units=metric&appid=f7a8d370890a30d4d69b416d7513a3e0
