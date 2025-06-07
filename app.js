let display = document.getElementById("display");
let inputActual = "0";
let inputPrevio = "";
let operador = "";
let esperandoOperando = false;

function actualizarDisplay() {
  display.textContent = inputActual;
}

function ingresarNumero(num) {
  if (esperandoOperando) {
    inputActual = num;
    esperandoOperando = false;
  } else {
    inputActual = inputActual === "0" ? num : inputActual + num;
  }
  actualizarDisplay();
}

function ingresarDecimal() {
  if (esperandoOperando) {
    inputActual = "0.";
    esperandoOperando = false;
  } else if (inputActual.indexOf(".") === -1) {
    inputActual += ".";
  }
  actualizarDisplay();
}

function ingresarOperando(siguienteOperador) {
  const inputValor = parseFloat(inputActual);

  if (inputPrevio === "") {
    inputPrevio = inputActual;
  } else if (operador) {
    const nuevoValor = realizarCalculo(
      parseFloat(inputPrevio),
      inputValor,
      operador
    );
    inputActual = String(nuevoValor);
    inputPrevio = inputActual;
    actualizarDisplay();
  }

  operador = siguienteOperador;
  esperandoOperando = true;
  actualizarDisplay();
}

function calcular() {
  const inputValor = parseFloat(inputActual);

  if (inputPrevio !== "" && operador) {
    const nuevoValor = realizarCalculo(parseFloat(inputPrevio), inputActual, operador);
    inputActual = String(nuevoValor);
    inputPrevio = "";
    operador = "";
    esperandoOperando = true;
    actualizarDisplay();
  }
}

function realizarCalculo(num1, num2, operador) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
  switch (operador) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : 0;
    case "%":
      return num1 % num2;
    default:
      return num2;
  }
}

function borrarTodo() {
  inputActual = "0";
  inputPrevio = "";
  operador = "";
  esperandoOperando = false;
  actualizarDisplay();
}

function borrarUltimo() {
  if (inputActual.length > 1) {
    inputActual = inputActual.slice(0, -1);
  } else {
    inputActual = "0";
  }
  actualizarDisplay();
}

// Soporte para teclado
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    ingresarNumero(key);
  } else if (key === ".") {
    ingresarDecimal();
  } else if (key === "+" || key === "-") {
    ingresarOperando(key);
  } else if (key === "*") {
    ingresarOperando("*");
  } else if (key === "/") {
    event.preventDefault();
    ingresarOperando("/");
  } else if (key === "%") {
    ingresarOperando("%");
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calcular();
  } else if (key === "Escape") {
    borrarTodo();
  } else if (key === "Backspace") {
    event.preventDefault();
    borrarUltimo();
  }
});

actualizarDisplay();
