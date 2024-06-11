import { cleanup } from "@testing-library/react";
import { assign, createMachine } from "xstate";
export const bookingMachine = createMachine(
  {
    id: "BookAFly",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: ''
    },
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
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: ({ event }) => event.selectedCountry
            })
          },
          CANCEL: "initial"
        },
      },
      passengers: {
        on: {
          DONE: "tickets",
          CANCEL: {
            target: "initial",
            actions: "cleanContext"
          },
          ADD: {
            target: 'passengers',
            actions: assign(
              ({context, event}) => context.passengers.push(event.newPassenger)
            )
          }
        },
      },
      tickets: {
        on: {
          FINISH: {
            target: "initial",
            actions: "cleanContext"
          }
        }
      },
    }
  },
  {
    actions: {
      imprimirInicio: () => console.log('Imprimir inicio'),
      imprimirEntrada: () => console.log('Imprimir entrada search'),
      imprimirSalida: () => console.log('Imprimir salida search'),
      cleanContext: assign({
        selectedCountry: '',
        passengers: []
      })
    }
  }
);
