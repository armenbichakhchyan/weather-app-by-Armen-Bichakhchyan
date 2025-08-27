import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import {RouterProvider} from "react-router-dom";
import {store} from "./store/store.ts";
import {router} from "./router/router.tsx";
import './assets/styles/main.scss'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
