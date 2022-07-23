import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="text-center my-4 bg-red-600 text-white uppercase font-semibold p-4" >
    {children}
</div>
  )
}

export default Alerta;