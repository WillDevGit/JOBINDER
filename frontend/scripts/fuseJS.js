const scriptFuse = document.createElement("script");
scriptFuse.src = "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0";
scriptFuse.async = true;
document.head.appendChild(scriptFuse);

// Categories list
const categories = [
  "Advocacia",
  "Cabelo",
  "Construção",
  "Desenvolvedor de Software",
  "Educação",
  "Eventos",
  "Informática",
  "Jardinagem",
  "Limpeza",
  "Marcenaria",
  "Mecânica",
  "Pedreiro",
  "Pintor",
  "Saúde",
];

const fuseJSLoaded = new Promise((resolve) => {
  scriptFuse.onload = resolve;
});

const fuseJS = async () => {
  await fuseJSLoaded;
  return new Fuse(categories, {
    threshold: 0.4, // The minimum score to include a result
    includeScore: true, // Allows to get the score distance
  });
};

export const searchCategory = async (search) => {
  const fuse = await fuseJS();
  return fuse.search(search);
};