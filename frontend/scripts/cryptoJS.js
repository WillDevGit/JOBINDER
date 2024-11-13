const scriptCryptoJS = document.createElement("script");
scriptCryptoJS.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js";
scriptCryptoJS.async = true;
document.head.appendChild(scriptCryptoJS);

const cryptoJSLoaded = new Promise((resolve) => {
  scriptCryptoJS.onload = resolve;
});

export const hash = async (string) => {
  await cryptoJSLoaded;
  const hashedString = CryptoJS.SHA256(string).toString();
  console.log(hashedString);
  return hashedString;
};
