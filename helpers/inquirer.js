require("colors");
const prompt = require("inquirer").createPromptModule();

const preguntas = [
    {
        type: "list",
        name: "opcion",
        message: "¿Que desea hacer?",
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]

    }
]

const inquirerMenu = async() => {
    
    console.clear();
    console.log("===========================".green);
    console.log("   Seleccione una opcion");
    console.log("===========================\n".green);

    const { opcion } = await prompt(preguntas);

    return opcion;
}

const pausa = async() =>{
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]

    console.log('\n');
    await prompt(question);
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await prompt(question);
    return desc;
}

const ListarLugares = async( lugares = [] ) => {
    const choices = lugares.map( (lugar, indx ) => {
        const idx = `${indx + 1}.`.green; 

        return {
            value: lugar.id,
            name: `${ idx } ${lugar.nombre}`,
        }
    });

    choices.push({
        value: 0,
        name: '0.'.green + ' Cancelar'.red
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione el lugar: ',
            choices
        }
    ]
    const { id } = await prompt(preguntas);
    return id;
}

const confirmar = async(message) =>{
    const question = [
        {
            type: 'confirm',
            name: "ok",
            message,
        }
    ];

    const { ok } = await prompt(question); 
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, indx ) => {
        const idx = `${indx + 1}.`.green; 

        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false,
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas a completar:',
            choices
        }
    ]
    const { ids } = await prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    ListarLugares,
    confirmar,
    mostrarListadoChecklist
}