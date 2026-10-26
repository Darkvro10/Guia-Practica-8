import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calcularCostoTotal(tarifaSeguro = 15, ...pesosPaquetes) {
    let pesoTotal = 0;

    for (const peso of pesosPaquetes) {
        pesoTotal = pesoTotal + peso;
    }

    const costoTransporte = pesoTotal * 3.50;
    const totalCobro = costoTransporte + tarifaSeguro;

    return totalCobro;
}

function imprimirCotizacion(cliente, totalCobro) {
    console.log("\n===== COTIZACION DE ENVIO =====");
    console.log("Cliente: " + cliente);
    console.log("Total a pagar: $" + totalCobro.toFixed(2));
}

rl.question("Ingrese el nombre del cliente: ", function(cliente) {
    rl.question("Ingrese el costo del seguro (ENTER para usar $15.00): ", function(entradaSeguro) {
        let tarifaSeguro;

        if (entradaSeguro.trim() === "") {
            tarifaSeguro = undefined;
        } else {
            tarifaSeguro = parseFloat(entradaSeguro);
        }

        if (tarifaSeguro !== undefined &&
            (isNaN(tarifaSeguro) || tarifaSeguro < 0)) {
            console.log("Error: ingrese una tarifa de seguro valida.");
            rl.close();
        } else {
            rl.question("Ingrese el peso del paquete 1 en kg: ", function(entradaPeso1) {
                const peso1 = parseFloat(entradaPeso1);

                rl.question("Ingrese el peso del paquete 2 en kg: ", function(entradaPeso2) {
                    const peso2 = parseFloat(entradaPeso2);

                    rl.question("Ingrese el peso del paquete 3 en kg: ", function(entradaPeso3) {
                        const peso3 = parseFloat(entradaPeso3);

                        if (entradaPeso1.trim() === "" || isNaN(peso1) || peso1 < 0 ||
                            entradaPeso2.trim() === "" || isNaN(peso2) || peso2 < 0 ||
                            entradaPeso3.trim() === "" || isNaN(peso3) || peso3 < 0) {
                            console.log("Error: los pesos deben ser numeros validos y no negativos.");
                        } else {
                            const totalCobro = calcularCostoTotal(
                                tarifaSeguro,
                                peso1,
                                peso2,
                                peso3
                            );

                            imprimirCotizacion(cliente, totalCobro);
                        }

                        rl.close();
                    });
                });
            });
        }
    });
});