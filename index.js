const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]
const input = document.getElementById("input")
const resultinput =document.getElementById("result")
const main = document.querySelector("main")
const root = document.querySelector(":root")

document.querySelectorAll('.charKey').forEach((charKeyBtn) => {
  charKeyBtn.addEventListener('click', function (){
    const value = charKeyBtn.dataset.value 
    input.value += value
  })
})  
// funçao para configurar os botoes da calculadora | function to configure the calculator buttons 


document.getElementById('clear').addEventListener('click', function() {
  input.value = ""
  resultinput.value = ""
  input.focus()
}) 
// funçao para limpar input | function to clean the input 

function resolve() {
  try {
    resultinput.classList.remove('error-message');
    const expression = input.value; 
    const result = eval(expression);
    resultinput.value = result;
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
    resultinput.value = "Error";
    resultinput.classList.add('error-message');
  }
}

input.addEventListener('keydown', function(ev){
  ev.preventDefault()
// impede o comportamento padrão do evento de teclado | prevents default keyboard event behavior
  if (allowedKeys.includes(ev.key)){
    input.value += ev.key
    return
  }
  if(ev.key === "Backspace") {
    input.value = input.value.slice(0,-1)
  }
  if(ev.key === "Enter"){
    resolve()
  }
})
//funçao para as teclas permitidas do teclado | function for the allowed keyboard keys
                

document.getElementById("equal").addEventListener("click", resolve)

document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
  const button = ev.currentTarget;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(resultinput.value).then(() => {
      button.innerText = "Copied!";
      button.classList.add("success");
    }, () => {
      button.innerText = "Copy Failed"; // Display error message on failure
      button.classList.remove("success");
      console.error("Failed to copy to clipboard");
    });
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = resultinput.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    button.innerText  = "Copied (Fallback)";
    button.classList.add("success");
  }
}); //funçao para copiar o texto de resultInput | function to copy the text of resultInput

document.getElementById("themeSwitcher").addEventListener("click", function() {
  console.log("funçao chamada")
  if (main.dataset.theme=== 'dark') {
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--border-color", "#aaa")
    root.style.setProperty("--font-color", "#212529")
    root.style.setProperty("--primary-color", "#26834a")
    main.dataset.theme = "light"
  } else {
    root.style.setProperty("--bg-color", "#212529")
    root.style.setProperty("--border-color", "#666")
    root.style.setProperty("--font-color", "#f1f5f9")
    root.style.setProperty("--primary-color", "#4dff91")
    main.dataset.theme = "dark"
  }
}) // funçao para trocar as cores | function to change the colors




