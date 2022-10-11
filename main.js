const container = document.querySelector(".seats-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value; //convert it into a number

//get data from local storage and display it
function populateUI() {
  //json.parse the opposite of json.stringify
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // greater than -1 means it is there
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//updating count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //copy selected seats into arr
  //map through arr
  // return a new arr of indexs
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //store it localy
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
// save selected movie index & price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
// movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
//initial count and total
updateSelectedCount();

// show fade on load
const screen = document.getElementById("screen");
setTimeout(() => {
  screen.classList.add("show");
}, 100);
// change icon

const icon = document.getElementById("icon");
icon.addEventListener("click", () => {
  icon.classList.toggle("fa-angle-down");
  icon.classList.toggle("fa-angle-up");
});
