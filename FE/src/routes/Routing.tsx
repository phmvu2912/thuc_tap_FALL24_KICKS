import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutClient from '../pages/layouts/(client)/LayoutClient'

const Routing = () => {
  return (
    <>
        <Routes>
            <Route element={<LayoutClient />}>
                
            </Route>
        </Routes>
    </>
  )
}

export default Routing