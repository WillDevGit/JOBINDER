const scriptFuse = document.createElement("script");
scriptFuse.src = "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0";
scriptFuse.async = true;
document.head.appendChild(scriptFuse);

// Categories list
const categories = [
  "Advocacia",
  "Cabelo",
  "Construção",
  "Educação",
  "Eventos",
  "Informática",
  "Limpeza",
  "Mecânica",
  "Saúde",
];

const fuseJSLoaded = new Promise((resolve) => {
  scriptFuse.onload = resolve;
});

const fuseJS = async () => {
  await fuseJSLoaded;
  return new Fuse(categories, {
    threshold: 0.4, // Ajuste a precisão da busca
    includeScore: true, // Exibe a pontuação de proximidade
  });
};

export const searchCategory = async (search) => {
    const fuse = await fuseJS();
    return fuse.search(search);
};

const testSearch = async (query) => {
    const results = await searchCategory(query);
    console.log(`Resultados para "${query}":`, results);
  };
  

// Testando as buscas
testSearch("Advoc"); // Espera encontrar "Advocacia"
testSearch("Construcao"); // Espera encontrar "Construção"
testSearch("saud"); // Espera encontrar "Saúde"