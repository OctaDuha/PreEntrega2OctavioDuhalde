class SimuladorCredito {
  constructor() {
    this.resultados = [];
    this.mensajeBienvenida = "Bienvenidos a Securanza, Créditos a sola firma";
    this.nombre = prompt("Ingrese su nombre");
    this.apellido = prompt("Ingrese su apellido");
    this.esSocio = confirm(
      "¿Eres socio? Presiona Aceptar para sí o Cancelar para no"
    );
  }

  calcularInteres(monto, cuotas, tasa) {
    let tasaDecimal = tasa / 100; // para convertir el porcentaje a decimal dividiendo por 100
    let tasaMensual = tasaDecimal / 12; // Divido la tasa anual entre 12 para obtener la tasa mensual
    let interes = monto * (tasaMensual * cuotas);
    return interes.toFixed(2);
  }

  iniciarSimulacion() {
    if (this.esSocio) {
      let realizarOtroCalculo;

      do {
        let mensaje = this.mensajeBienvenida;

        mensaje += "Nombre: " + this.nombre + " " + this.apellido + "\n";
        mensaje += "=================================================\n";
        mensaje +=
          "- El Crédito solicitado es solo para socios de la compañía\n";
        mensaje +=
          "***********************************************************\n";

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
        let tasaDecimal = parseFloat(tasa) / 12; // convertir el porcentaje a decimal dividiendo por 100
        mensaje += "- Interés cobrado: $ " + interes + "\n";

        let total = parseFloat(monto) + parseFloat(interes);
        mensaje += "- Total del préstamo: $ " + total.toFixed(2) + "\n";
        mensaje += "- Cuota correspondiente: $ " + (total / cuotas).toFixed(2);

        alert(mensaje);

        this.resultados.push({
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
    for (let i = 0; i < this.resultados.length; i++) {
      resultadoFinal += "Crédito " + (i + 1) + "\n";
      resultadoFinal +=
        "Monto solicitado: $ " + this.resultados[i].monto + "\n";
      resultadoFinal +=
        "Interés cobrado: $ " + this.resultados[i].interes + "\n";
      resultadoFinal +=
        "Tasa Interés anual: " + this.resultados[i].tasa + "%\n";
      resultadoFinal +=
        "Tasa Interés mensual: " + this.resultados[i].tasaDecimal + "%\n";
      resultadoFinal +=
        "Cuota correspondiente: $ " +
        (this.resultados[i].total / this.resultados[i].cuotas).toFixed(2) +
        "\n";
      resultadoFinal +=
        "Monto Total del préstamo: $ " + this.resultados[i].total + "\n";
    }
    alert(resultadoFinal);
  }
}

// Crear una instancia de la clase y ejecutar la simulación
const simulador = new SimuladorCredito();
simulador.iniciarSimulacion();