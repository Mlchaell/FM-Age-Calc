const yearsInput = document.getElementById("year-input");
const monthsInput = document.getElementById("month-input");
const daysInput = document.getElementById("day-input");

const yearsLabel = document.getElementById("years-result");
const monthsLabel = document.getElementById("months-result");
const daysLabel = document.getElementById("days-result");

const errorLabels = document.querySelectorAll("#error-label");

const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

const today = new Date();
const curYear = today.getFullYear();
const curMonth = today.getMonth() + 1;
const curDay = today.getDate();

function isValidDate(dateType, num) {
  if (dateType === "year" && num <= curYear && num >= 0 ) { return true; }
  if (dateType === "month" && num >= 1 && num <= 12) { return true; }

  let days31 = ["1", "3", "5", "7", "8", "10", "12"];
  let days30 = ["4", "6", "9", "11"];
  let days28 = ["2"];

  if (dateType === "day") {
    if (days31.includes(monthsInput.value) && num <= 31 && num >= 1) { return true; }
    if (days30.includes(monthsInput.value) && num <= 30 && num >= 1) { return true; }
    if (days28.includes(monthsInput.value) && num <= 28 && num >= 1) { return true; }
  }

  return false;
}

function displayError(dateType) {
  if (dateType === "day") {
    errorLabels[0].classList.add("error-color");
    daysInput.classList.add("error-field");
    dayError.classList.remove("hidden");
  } else if (dateType === "month") {
    errorLabels[1].classList.add("error-color");
    monthsInput.classList.add("error-field");
    monthError.classList.remove("hidden");
  } else if (dateType === "year") {
    errorLabels[2].classList.add("error-color");
    yearsInput.classList.add("error-field");
    yearError.classList.remove("hidden");
  }
}

function clearErrors(dateType) {
  if (dateType === "day") {
    errorLabels[0].classList.remove("error-color");
    daysInput.classList.remove("error-field");
    dayError.classList.add("hidden");
  } else if (dateType === "month") {
    errorLabels[1].classList.remove("error-color");
    monthsInput.classList.remove("error-field");
    monthError.classList.add("hidden");
  } else if (dateType === "year") {
    errorLabels[2].classList.remove("error-color");
    yearsInput.classList.remove("error-field");
    yearError.classList.add("hidden");
  }
}

function getYearsAgo() {
  return yearsInput.value - curYear;
}

function getMonthsAgo() {
  return monthsInput.value - curMonth;
}

function getDaysAgo() {
  return curDay - daysInput.value;
}

yearsInput.addEventListener("input", () => {
  validCheck = isValidDate("year", yearsInput.value)

  if (validCheck) {
    clearErrors("year");
    yearsLabel.innerText = Math.abs(getYearsAgo());
  } else { displayError("year"); }
})

monthsInput.addEventListener("input", () => {
  validCheck = isValidDate("month", monthsInput.value)

  if (validCheck) {
    clearErrors("month");
    monthsLabel.innerText = Math.abs(getMonthsAgo());
  } else { displayError("month"); }
})

// TODO: Add error msg for days being entered without a month entered first
daysInput.addEventListener("input", () => {
  validCheck = isValidDate("day", daysInput.value)

  if (validCheck) {
    clearErrors("day");
    daysLabel.innerText = Math.abs(getDaysAgo());
  } else { displayError("day"); }
})