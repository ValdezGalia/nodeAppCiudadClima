require('colors');
require('dotenv').config();
const { leerInput, inquirerMenu, confirmar, pausa, ListarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
    const busqueda = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const terBusqueda = await leerInput('Indique la ciudad: ');
                
                // Buscar los lugares
                const lugares = await busqueda.ciudad( terBusqueda );
                
                // Seleccionar el lugar
                const id = await ListarLugares( lugares );

                if ( id !== 0 ) {    
                    
                    const { nombre, lat, lng } = lugares.find( l => l.id === id );
                    busqueda.agregarHistorial( nombre );
                    // Clima
                    const { temp, max, min, desc } = await busqueda.climaLugar( lat, lng );
                    
                    //Mostrar resultados
                    console.clear();
                    console.log('\nInformacion de la ciudad\n'.green);
                    console.log('Ciudad:', nombre.green);
                    console.log('Lat:', lat);
                    console.log('Lng:', lng);
                    console.log('Temperatura:', temp);
                    console.log('Máxima:', max);
                    console.log('Mínima:', min);
                    console.log('Comó está el clima:', desc.green);
                }

            break;

            case 2:
                busqueda.historialCapitalizado.forEach( (lugar, i) => {
                    let indx = `${i+1}.`.green;
                    console.log(`${indx} ${lugar}`);
                })
            break;
        }

        if ( opt !== 0 ) await pausa();
    } while ( opt !== 0 );

}

main();