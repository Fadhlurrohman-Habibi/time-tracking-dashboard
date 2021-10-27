// get the elements
const dailyBtn = document.querySelector('.daily');
const weeklyBtn = document.querySelector('.weekly');
const monthlyBtn = document.querySelector('.monthly');
const dates = document.querySelectorAll('.date');

// get the data
getData();
async function getData() {
  const response = await fetch('./data.json');
  const data = await response.json();
  displayData(data);
}

// display the data
function displayData(data) {
  // iterate over each item
  data.forEach((item) => {
    // get and create elemnts
    const items = document.querySelector('.items');
    const itemCard = document.createElement('div');

    itemCard.classList.add(
      'item-card',
      `${
        item.title.toLowerCase() !== 'self care'
          ? item.title.toLowerCase()
          : 'selfcare'
      }`
    );
    weeklyBtn.classList.add('active');

    // create the actual HTML
    function createHTML(title, hours, date) {
      itemCard.innerHTML = `<header class="item-header">
              <img src="./images/icon-${
                title.toLowerCase() !== 'self care'
                  ? title.toLowerCase()
                  : 'self-care'
              }.svg" alt="" />
            </header>
            <div class="item-content">
              <div class="item-title">
                <h4>${title}</h4>
                <img src="./images/icon-ellipsis.svg" alt="" />
              </div>
              <div class="item-footer">
                <p class="hour">${hours} hrs</p>
                <p class="last">Last Week - ${date} hrs</p>
              </div>
            </div>`;
    }

    // calling th functions for the basic HTML
    createHTML(
      item.title,
      item.timeframes.weekly.current,
      item.timeframes.weekly.previous
    );
    items.appendChild(itemCard);

    // dailyBtn event
    dailyBtn.addEventListener('click', () => {
      dates.forEach((date) => date.classList.remove('active'));
      dailyBtn.classList.add('active');
      createHTML(
        item.title,
        item.timeframes.daily.current,
        item.timeframes.daily.previous
      );
    });
    // weeklyBtn event
    weeklyBtn.addEventListener('click', () => {
      dates.forEach((date) => date.classList.remove('active'));
      weeklyBtn.classList.add('active');
      createHTML(
        item.title,
        item.timeframes.weekly.current,
        item.timeframes.weekly.previous
      );
    });
    // monthlyBtn event
    monthlyBtn.addEventListener('click', () => {
      dates.forEach((date) => date.classList.remove('active'));
      monthlyBtn.classList.add('active');
      createHTML(
        item.title,
        item.timeframes.monthly.current,
        item.timeframes.monthly.previous
      );
    });
  });
}