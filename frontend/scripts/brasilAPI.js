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

export { getStates, getCities };
