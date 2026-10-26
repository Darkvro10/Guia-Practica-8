import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calcularComision(montoVentas, porcentajeComision = 5) {
    return montoVentas * porcentajeComision / 100;
}

rl.question("Ingrese el monto total de ventas: ", function(entradaVentas) {
    const montoVentas = parseFloat(entradaVentas);

    if (entradaVentas.trim() === "" || isNaN(montoVentas)) {
        console.log("Error: ingrese un monto de ventas valido.");
        rl.close();
    } else {
        rl.question("Ingrese el porcentaje de comision (ENTER para usar 5%): ", function(entradaPorcentaje) {
            let porcentajeComision;

            if (entradaPorcentaje.trim() === "") {
                porcentajeComision = undefined;
            } else {
                porcentajeComision = parseFloat(entradaPorcentaje);
            }

            if (porcentajeComision !== undefined && isNaN(porcentajeComision)) {
                console.log("Error: ingrese un porcentaje valido.");
            } else {
                const comision = calcularComision(montoVentas, porcentajeComision);
                console.log("La comision ganada es: $" + comision.toFixed(2));
            }

            rl.close();
        });
    }
});