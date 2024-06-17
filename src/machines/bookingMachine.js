import { assign, createMachine, fromPromise } from "xstate";
import { fetchCountries } from "../utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: fromPromise( () => fetchCountries()),
        onDone: {
          target: 'success',
          actions: assign({
            countries: ({context, event}) => event.output
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Request failed'
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: {target: 'loading'}
      }
    }
  }
}

export const bookingMachine = createMachine(
  {
    id: "BookAFly",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: '',
      countries: [],
      error: ''
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            actions: ""//"imprimirInicio"
          }
        },
      },
      search: {
        // entry: "imprimirEntrada",
        // exit: 'imprimirSalida',
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: ({ event }) => event.selectedCountry
            })
          },
          CANCEL: "initial"
        },
        ...fillCountries
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            guard: "moreThanOnePassenger"
          },
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
        // after: {
        //   5000: {
        //     target: 'initial',
        //     actions: 'cleanContext'
        //   }
        // },
        on: {
          FINISH: {
            target: "initial",
          }
        }
      },
    }
  },
  {
    actions: {
      // imprimirInicio: () => console.log('Imprimir inicio'),
      // imprimirEntrada: () => console.log('Imprimir entrada search'),
      // imprimirSalida: () => console.log('Imprimir salida search'),
      cleanContext: assign({
        selectedCountry: '',
        passengers: []
      })
    },
    guards: {
      moreThanOnePassenger: ({context}) => {
        return context.passengers.length > 0
      } 
    }
  }
);
