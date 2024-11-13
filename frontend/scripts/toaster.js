// Link to the toastr CSS 
const linkToastrCSS = document.createElement("link");
linkToastrCSS.rel = "stylesheet";
linkToastrCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css";
document.head.appendChild(linkToastrCSS);

// Link to the jQuery library
const scriptJQuery = document.createElement("script");
scriptJQuery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
scriptJQuery.async = true;
document.head.appendChild(scriptJQuery);

// Link to the toastr JS
const scriptToastrJS = document.createElement("script");
scriptToastrJS.src = " https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js";
scriptToastrJS.async = true;
document.head.appendChild(scriptToastrJS);

// Initialize the toastr
scriptToastrJS.onload = () => {
  toastr.options = {
    closeButton: false, // Exibe o botão de fechar
    debug: false, // Desativa o modo de depuração
    newestOnTop: true, // Coloca as novas notificações no topo
    progressBar: true, // Exibe a barra de progresso
    positionClass: "toast-bottom-right", // Posição da notificação
    preventDuplicates: true, // Evita notificações duplicadas
    tapToDismiss: false, // Desativa o comportamento de fechar ao clicar
    onclick: null, // Ação ao clicar na notificação
    showDuration: "300", // Duração da animação ao mostrar (ms)
    hideDuration: "1000", // Duração da animação ao esconder (ms)
    timeOut: "5000", // Tempo antes de ocultar automaticamente (ms)
    extendedTimeOut: "0", // Tempo extra ao passar o mouse
    showEasing: "swing", // Efeito de suavização ao mostrar
    hideEasing: "linear", // Efeito de suavização ao esconder
    showMethod: "fadeIn", // Método de exibição (fadeIn, slideDown, etc.)
    hideMethod: "fadeOut", // Método de ocultação (fadeOut, slideUp, etc.)
  };
};
