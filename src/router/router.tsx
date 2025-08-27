import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
} from "react-router-dom";

import Wheather from '../pages/Wheather'
import NotFound from "../pages/NotFound.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Wheather />} />

            <Route path='404' element={<NotFound />} />
            <Route path='*' element={<Navigate to='404' replace />}/>
        </>
    )
)