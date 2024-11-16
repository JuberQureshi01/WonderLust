// EJavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  // Tax switch button
  let taxSwitch = document.getElementById("flexSwitchCheckDefault")
  taxSwitch.addEventListener("click",()=>{
    let taxInfo = document.getElementsByClassName("tax-info");
    for(Info of taxInfo){

      if(Info.style.display!="inline"){
        Info.style.display="inline";
      }
      else{
        Info.style.display="none";
      }
    }
  })

  // Slidebar of categoryy

  let currentTranslateX = 0; // Track the current translation value

const container = document.getElementById('filters'); // The container of the icons
const icons = document.getElementsByClassName("icon"); // All the icons
const iconWidth = icons[0].offsetWidth + 20; // Get the width of one icon plus some margin/padding
const visibleWidth = container.offsetWidth; // Width of the visible container
const totalIconsWidth = iconWidth * icons.length; // Total width of all icons
const maxTranslateX = 0; // Maximum translation (icons shouldn't move beyond the leftmost point)
const minTranslateX = visibleWidth - totalIconsWidth; // Minimum translation (icons shouldn't move beyond the rightmost point)

document.getElementById('left-btn').addEventListener('click', () => {
    // Decrease the translation value when clicking left (moving icons to the right)
    currentTranslateX -= 70;

    // Make sure the icons do not move beyond the minimum limit
    if (currentTranslateX < minTranslateX) {
        currentTranslateX = minTranslateX;
    }

    // Apply the transform and ensure smooth transition
    for (let i = 0; i < icons.length; i++) {
        icons[i].style.transition = "transform 0.8s ease"; // Smooth transition
        icons[i].style.transform = `translateX(${currentTranslateX}px)`;
    }
});

document.getElementById('right-btn').addEventListener('click', () => {
    // Increase the translation value when clicking right (moving icons to the left)
    currentTranslateX += 150;

    // Make sure the icons do not move beyond the maximum limit
    if (currentTranslateX > maxTranslateX) {
        currentTranslateX = maxTranslateX;
    }

    // Apply the transform and ensure smooth transition
    for (let i = 0; i < icons.length; i++) {
        icons[i].style.transition = "transform 0.8s ease"; // Smooth transition
        icons[i].style.transform = `translateX(${currentTranslateX}px)`;
    }
});

// ENd


document.addEventListener("DOMContentLoaded", function () {
  const showCalendarBtn = document.getElementById("showCalendarBtn");
  const calendarContainer = document.getElementById("calendarContainer");
  const cancelBtn = document.getElementById("cancelBtn");
  const applyBtn = document.getElementById("applyBtn");
  const calendarDates = document.getElementById("calendar__dates");
  const monthSelect = document.getElementById("calendar__month");
  const yearSelect = document.getElementById("calendar__year");

  let startDateDiv = null;  // Reference for the start date
  let endDateDiv = null;    // Reference for the end date
  let isSelectingEndDate = false;  // Flag to indicate whether to select end date

  // Toggle calendar visibility
  showCalendarBtn.addEventListener("click", function () {
    calendarContainer.style.display = calendarContainer.style.display === "none" ? "block" : "none";
    populateDates();  // Populate dates when the calendar is shown
  });

  // Hide calendar on Cancel
  cancelBtn.addEventListener("click", function () {
    calendarContainer.style.display = "none";
  });

  // Apply the selected date range
  applyBtn.addEventListener("click", function () {
    if (startDateDiv && endDateDiv) {
      console.log("Start Date:", startDateDiv.textContent);
      console.log("End Date:", endDateDiv.textContent);
    } else {
      console.log("Date range not selected properly");
    }
    calendarContainer.style.display = "none";  // Hide the calendar after applying the date range
  });

  // calendar
  // Function to populate the calendar with dates
  function populateDates() {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);

    // Clear previous dates
    calendarDates.innerHTML = "";

    // Get the number of days in the selected month and year
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

    // Add blank days for the days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const blankDate = document.createElement("div");
      blankDate.classList.add("calendar__date");
      calendarDates.appendChild(blankDate);
    }

    // Add the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateDiv = document.createElement("div");
      dateDiv.classList.add("calendar__date");
      dateDiv.textContent = day;

      // Event listener for date selection
      dateDiv.addEventListener("click", function () {
        if (!startDateDiv) {
          // If no start date is selected, set this as the start date
          startDateDiv = dateDiv;
          startDateDiv.classList.add("selected-date");
        } else if (!endDateDiv) {
          // If no end date is selected, set this as the end date
          endDateDiv = dateDiv;
          endDateDiv.classList.add("selected-date");

          // Highlight all dates between start and end date
          highlightRange(startDateDiv, endDateDiv);
        } else {
          // Reset if both dates are selected and clicked again
          resetSelection();
          startDateDiv = dateDiv;
          startDateDiv.classList.add("selected-date");
        }
      });

      calendarDates.appendChild(dateDiv);
    }
  }

  // Function to highlight all dates between start and end dates
  function highlightRange(start, end) {
    const startDay = parseInt(start.textContent);
    const endDay = parseInt(end.textContent);

    // Ensure start day is less than end day
    if (startDay > endDay) {
      const temp = start;
      start = end;
      end = temp;
    }

    const allDates = document.querySelectorAll(".calendar__date");

    let isInRange = false;

    allDates.forEach(function (dateDiv) {
      const day = parseInt(dateDiv.textContent);
      if (day === startDay) {
        isInRange = true; // Start range
      }

      if (isInRange) {
        dateDiv.classList.add("in-range");
      }

      if (day === endDay) {
        isInRange = false; // End range
      }
    });
  }

  // Function to reset the selection
  function resetSelection() {
    const selectedDates = document.querySelectorAll(".selected-date");
    selectedDates.forEach(function (dateDiv) {
      dateDiv.classList.remove("selected-date");
    });

    const inRangeDates = document.querySelectorAll(".in-range");
    inRangeDates.forEach(function (dateDiv) {
      dateDiv.classList.remove("in-range");
    });

    startDateDiv = null;
    endDateDiv = null;
  }

  // Populate the calendar when month or year is changed
  monthSelect.addEventListener("change", populateDates);
  yearSelect.addEventListener("change", populateDates);

  // Initially populate the calendar
  populateDates();
});