const captalize = (string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getStates = async () => {
  try {
    const response = await fetch("https://brasilapi.com.br/api/ibge/uf/v1");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

const getCities = async (state) => {
  try {
    if (!state) return;

    const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    data.forEach((city) => {
      city.nome = captalize(city.nome);
    });
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

const getCoordinates = async (city) => {
  try {
    const cityEncoded = encodeURI(city);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${cityEncoded}&format=json`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { lat: data[0].lat, lon: data[0].lon };
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

const distanceBetweenCities = async (city1, city2) => {
  const city1Coordinates = await getCoordinates(city1);
  const city2Coordinates = await getCoordinates(city2);

  const lat1 = city1Coordinates.lat;
  const lon1 = city1Coordinates.lon;
  const lat2 = city2Coordinates.lat;
  const lon2 = city2Coordinates.lon;

  const R = 6371e3; // metres
  const toRad = (angle) => (angle * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distância em km
};

export { getStates, getCities, getCoordinates, distanceBetweenCities };
