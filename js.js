class SimuladorCredito {
  constructor() {
    this.resultados = [];
    this.mensajeBienvenida = "Bienvenidos a Securanza, Créditos a sola firma";

    const usuario = obtenerUsuario();
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;

    this.esSocio = confirm(
      "¿Eres socio? Presiona Aceptar para sí o Cancelar para no"
    );
  }

  calcularInteres(monto, cuotas, tasa) {
    let tasaDecimal = tasa / 100;
    let tasaMensual = tasaDecimal / 12;
    let interes = monto * (tasaMensual * cuotas);
    return interes.toFixed(2);
  }

  iniciarSimulacion() {
    const fechaActual = luxon.DateTime.local().toISODate();
    if (this.esSocio) {
      let realizarOtroCalculo;

      do {
        let mensaje = this.mensajeBienvenida;

        mensaje += "Nombre: " + this.nombre + " " + this.apellido + "\n";
        mensaje += "=====================================\n";
        mensaje +=
          "- El Crédito solicitado es solo para socios de la compañía\n";
        mensaje +=
          "**********************************************************\n";

        let monto = prompt("Ingrese el monto que desea solicitar");
        monto = parseFloat(monto).toFixed(2);
        mensaje += "- Monto solicitado: " + monto + "\n";

        let cuotas = prompt("En cuántas cuotas: 3, 6 o 12");

        while (cuotas !== "3" && cuotas !== "6" && cuotas !== "12") {
          cuotas = prompt("Ingrese un valor válido para las cuotas: 3, 6 o 12");
        }

        mensaje += "- En " + cuotas + " cuotas \n";

        let tasa = prompt("Ingrese la tasa de interés");

        while (isNaN(tasa) || parseFloat(tasa) <= 0) {
          tasa = prompt("Ingrese un valor válido para la tasa de interés");
        }

        let interes = this.calcularInteres(monto, cuotas, parseFloat(tasa));
        let tasaDecimal = parseFloat(tasa) / 12;

        mensaje += "- Interés cobrado: $ " + interes + "\n";

        let total = parseFloat(monto) + parseFloat(interes);
        mensaje += "- Total del préstamo: $ " + total.toFixed(2) + "\n";
        mensaje += "- Cuota correspondiente: $ " + (total / cuotas).toFixed(2);

        alert(mensaje);

        this.resultados.push({
          fecha: fechaActual,
          monto: monto,
          interes: interes,
          tasa: tasa,
          tasaDecimal: tasaDecimal.toFixed(2),
          cuotas: cuotas,
          total: total.toFixed(2),
        });

        realizarOtroCalculo = confirm("¿Deseas realizar otro cálculo?");
      } while (realizarOtroCalculo);

      this.mostrarResultados();
    } else {
      alert("Lo sentimos, el crédito solo está disponible para socios.");
    }
  }

  mostrarResultados() {
    let resultadoFinal =
      "Simulacro de Crédito para el cliente: " +
      this.nombre +
      " " +
      this.apellido +
      ":\n";
    resultadoFinal += "=====================================\n";

    const resultadosContainer = document.createElement("div");

    for (let i = 0; i < this.resultados.length; i++) {
      const creditoDiv = document.createElement("div");
      creditoDiv.classList.add("credito");

      const fechaP = document.createElement("p");
      fechaP.textContent = "Fecha: " + this.resultados[i].fecha;
      creditoDiv.appendChild(fechaP);

      const creditoHeading = document.createElement("h3");
      creditoHeading.textContent = "Crédito " + (i + 1);
      creditoDiv.appendChild(creditoHeading);

      const montoP = document.createElement("p");
      montoP.textContent = "Monto solicitado: $ " + this.resultados[i].monto;
      creditoDiv.appendChild(montoP);

      const interesP = document.createElement("p");
      interesP.textContent = "Interés cobrado: $ " + this.resultados[i].interes;
      creditoDiv.appendChild(interesP);

      const tasaAnualP = document.createElement("p");
      tasaAnualP.textContent =
        "Tasa Interés anual: " + this.resultados[i].tasa + "%";
      creditoDiv.appendChild(tasaAnualP);

      const tasaMensualP = document.createElement("p");
      tasaMensualP.textContent =
        "Tasa Interés mensual: " + this.resultados[i].tasaDecimal + "%";
      creditoDiv.appendChild(tasaMensualP);

      const cuotaP = document.createElement("p");
      cuotaP.textContent =
        "Cuota correspondiente: $ " +
        (this.resultados[i].total / this.resultados[i].cuotas).toFixed(2);
      creditoDiv.appendChild(cuotaP);

      const totalP = document.createElement("p");
      totalP.textContent =
        "Monto Total del préstamo: $ " + this.resultados[i].total;
      creditoDiv.appendChild(totalP);

      resultadosContainer.appendChild(creditoDiv);
    }

    document.body.appendChild(resultadosContainer);
  }
}

function obtenerUsuario() {
  let usuario;
  let usuarioEnLS = JSON.parse(localStorage.getItem("usuario"));

  if (usuarioEnLS) {
    usuario = usuarioEnLS;
  } else {
    const nombre = prompt("Ingrese su nombre");
    const apellido = prompt("Ingrese su apellido");
    usuario = { nombre, apellido };
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  return usuario;
}

function iniciar() {
  // Crear una instancia de la clase y ejecutar la simulación
  const simulador = new SimuladorCredito();
  simulador.iniciarSimulacion();
}
