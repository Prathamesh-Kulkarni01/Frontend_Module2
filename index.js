
const gridViewTab = document.getElementById("gridViewTab");
const listViewTab = document.getElementById("listViewTab");
const cryptoDataContainer = document.getElementById("cryptoDataContainer");
let currentView = "grid"; 


async function fetchCryptoData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; 
  }
}


function renderGridView(data) {
  const gridViewContainer = document.createElement("div");
  gridViewContainer.classList.add("grid-view-container");

  data.forEach((crypto) => {
    const card = document.createElement("div");
    card.classList.add("crypto-card");

    const image = document.createElement("img");
    image.src = crypto.image;
    image.alt = crypto.name;
    card.appendChild(image);

    const name = document.createElement("div");
    name.classList.add("crypto-name");
    name.textContent = crypto.name;
    card.appendChild(name);

    const price = document.createElement("div");
    price.classList.add("crypto-price");
    price.textContent = "$" + crypto.current_price.toFixed(2);
    card.appendChild(price);

    const marketCap = document.createElement("div");
    marketCap.classList.add("crypto-market-cap");
    marketCap.textContent =
      "Market Cap: $" + crypto.market_cap.toLocaleString();
    card.appendChild(marketCap);

    const priceChange = document.createElement("div");
    priceChange.classList.add("crypto-price-change");
    priceChange.textContent =
      "24h Change: " + crypto.price_change_percentage_24h.toFixed(2) + "%";
    card.appendChild(priceChange);

    gridViewContainer.appendChild(card);
  });

  cryptoDataContainer.innerHTML = ""; 
  cryptoDataContainer.appendChild(gridViewContainer);
}


function renderListView(data) {
  const listViewContainer = document.createElement("table");
  listViewContainer.classList.add("list-view-container");


  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    <th>Cryptocurrency</th>
    <th>Current Price</th>
    <th>Market Cap</th>
    <th>24h Change</th>
  `;
  listViewContainer.appendChild(headerRow);


  data.forEach((crypto) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = crypto.name;
    row.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = "$" + crypto.current_price.toFixed(2);
    row.appendChild(priceCell);

    const marketCapCell = document.createElement("td");
    marketCapCell.textContent = "$" + crypto.market_cap.toLocaleString();
    row.appendChild(marketCapCell);

    const priceChangeCell = document.createElement("td");
    priceChangeCell.textContent =
      crypto.price_change_percentage_24h.toFixed(2) + "%";
    row.appendChild(priceChangeCell);

    listViewContainer.appendChild(row);
  });

  cryptoDataContainer.innerHTML = ""; 
  cryptoDataContainer.appendChild(listViewContainer);
}


function switchView(view) {
  if (currentView === "grid") {
    gridViewTab.classList.remove("active");
  } else {
    listViewTab.classList.remove("active");
  }

  if (view === "grid") {
    gridViewTab.classList.add("active");
  } else {
    listViewTab.classList.add("active");
  }


  currentView = view;
  if (currentView === "grid") {
    cryptoDataContainer.classList.remove("list-view");
    cryptoDataContainer.classList.add("grid-view");
    fetchCryptoData().then((data) => renderGridView(data));
  } else {
    cryptoDataContainer.classList.remove("grid-view");
    cryptoDataContainer.classList.add("list-view");
    fetchCryptoData().then((data) => renderListView(data));
  }
}


function handleTabClick(event) {
  const target = event.target;
  if (target === gridViewTab && currentView !== "grid") {
    switchView("grid");
  } else if (target === listViewTab && currentView !== "list") {
    switchView("list");
  }
}


gridViewTab.addEventListener("click", handleTabClick);
listViewTab.addEventListener("click", handleTabClick);

fetchCryptoData().then((data) => {
  renderGridView(data); 
});
