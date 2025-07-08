const dailySlots = ["08:00", "10:00", "12:00", "14:00", "16:00"];
const bookingKey = 'spsBookings';

function getBookings() {
  return JSON.parse(localStorage.getItem(bookingKey)) || {};
}

function saveBookings(data) {
  localStorage.setItem(bookingKey, JSON.stringify(data));
}

function isDayFullyBooked(dateStr) {
  const data = getBookings();
  const booked = data[dateStr] || [];
  return booked.length >= dailySlots.length;
}

function getAvailableTimes(dateStr) {
  const data = getBookings();
  const booked = data[dateStr] || [];
  return dailySlots.filter(t => !booked.includes(t));
}

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  calendar.innerHTML = "";

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear, currentMonth, d);
    const dateStr = date.toISOString().split("T")[0];

    const btn = document.createElement("button");
    btn.textContent = date.toDateString();
    btn.dataset.date = dateStr;
    btn.className = "calendar-day";

    if (isDayFullyBooked(dateStr)) {
      btn.disabled = true;
      btn.classList.add("disabled");
      btn.textContent += " (Booked)";
    }

    btn.addEventListener("click", () => showTimeSlots(dateStr));
    calendar.appendChild(btn);
  }
}

function formatTime(timeStr) {
  const [hour, minute] = timeStr.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${suffix}`;
}

function showTimeSlots(dateStr) {
  const timesContainer = document.getElementById("time-slots");
  const backButton = document.getElementById("back-button");
  timesContainer.innerHTML = "";

  const available = getAvailableTimes(dateStr);
  if (available.length === 0) {
    timesContainer.innerHTML = `<p>All time slots are booked for this day.</p>`;
  } else {
    available.forEach(time => {
      const btn = document.createElement("button");
      btn.textContent = formatTime(time);
      btn.className = "time-slot";
      btn.addEventListener("click", () => showBookingForm(dateStr, time));
      timesContainer.appendChild(btn);
    });
  }

  document.getElementById("calendar").style.display = "none";
  timesContainer.style.display = "flex";
  backButton.style.display = "inline-block";
}

function showBookingForm(dateStr, timeStr) {
  document.getElementById("form-date").value = dateStr;
  document.getElementById("form-time").value = timeStr;

  document.getElementById("booking-form").style.display = "flex";
  document.getElementById("time-slots").style.display = "none";
  document.getElementById("back-button").style.display = "none";
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderCalendar();

  const form = document.getElementById("booking-form");
  form.addEventListener("submit", (e) => {
    const date = document.getElementById("form-date").value;
    const time = document.getElementById("form-time").value;

    const data = getBookings();
    if (!data[date]) data[date] = [];
    data[date].push(time);
    saveBookings(data);
  });

  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      document.getElementById("time-slots").style.display = "none";
      document.getElementById("calendar").style.display = "flex";
      backButton.style.display = "none";
    });
  }
});
