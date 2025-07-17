# scatter-brained

an agile estimation plan helper

Are the brains of your project scattered worldwide? When doing agile/scrum/xtreme planning this can be used to communicate estimations in remote meetings. Someone just needs to expose it to the internet.

Each user selects a "card" estimate opening the option to show all other estimates. With shown estimates a button can reset for the next story. Users can be in a "lurk" state if they are watching but not estimating or kicked out of the room with easy reentry.

## Targets

| Target | Description |
| ------ | ----------- |
| run    | executes the application. as in `VITE_WS_PORT=3000 VITE_HOST=alanglenn16.mynetgear.com VITE_PORT=8000 VITE_CARDS=[1,2,3] make clean run` |

## Environment Variables
| Variable         | Default              | Description |
| ---------------- | -------------------- | ----------- |
| VITE_WS_PORT     | 3333                 | The port the browser knows to look for the websocket |
| VITE_PORT        | 8888                 | entry port on host |
| VITE_HOST        | localhost            | host the browser is looking for |
| VITE_WS_LAN_PORT | VITE_WS_PORT or 3333 | host port for websocket |
| VITE_LAN_HOST    | 0.0.0.0              | host the application binds |
| VITE_CARDS       | [1,2,3,5]            | selections available for application users |


