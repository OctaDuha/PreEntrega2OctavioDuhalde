function calcular_interes(monto, cuotas) {
  if (cuotas == 3) {
    let interes = monto * 0.15;
    return interes;
  } else if (cuotas == 6) {
    let interes = monto * 0.45;
    return interes;
  } else if (cuotas == 12) {
    let interes = monto * 0.9;
    return interes;
  }
}

inicio: while (true) {
  let mensaje = "Bienvenidos a Securanza, compañia de prestamos \n";

  let esSocio = confirm(
    "¿Eres socio? Presiona Aceptar para sí o Cancelar para no"
  );

  if (esSocio) {
    mensaje += "El monto solicitado es solo para socios.\n";

    let monto = prompt("Ingrese el monto que desea solicitar");
    monto = parseInt(monto);
    mensaje += "Pediste: " + monto + "\n";

    let cuotas = prompt("En cuantas cuotas: 3, 6 o 12");

    while (cuotas != 3 && cuotas != 6 && cuotas != 12) {
      cuotas = prompt("Ingrese un valor válido para las cuotas: 3, 6 o 12");
    }

    mensaje += "En " + cuotas + "cuotas \n";

    let total = monto + calcular_interes(monto, cuotas);
    mensaje += "Total con interes: " + total + "\n";
    mensaje += "Pagas por cuotas: " + total / cuotas;

    alert(mensaje);
  } else {
    alert("Lo sentimos, el crédito solo está disponible para socios.");
    continue inicio;
  }

  let realizarOtroCalculo = confirm("¿Deseas realizar otro cálculo?");

  if (!realizarOtroCalculo) {
    break inicio;
  }
}