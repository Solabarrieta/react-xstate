import { createMachine } from "xstate";
export const bookingMachine = createMachine(
  {
    id: "BookAFly",
    initial: "initial",
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            actions: "imprimirInicio"
          }
        },
      },
      search: {
        entry: "imprimirEntrada",
        exit: 'imprimirSalida',
        on: {
          CONTINUE: "passengers",
          CANCEL: "initial"
        },
      },
      passengers: {
        on: {
          DONE: "tickets",
          CANCEL: "initial"
        },
      },
      tickets: {
        on: {
          FINISH: "initial"
        }
      },
    }
  },
  {
    actions: {
      imprimirInicio: () => console.log('Imprimir inicio'),
      imprimirEntrada: () => console.log('Imprimir entrada search'),
      imprimirSalida: () => console.log('Imprimir salida search'),
    }
  }
);
