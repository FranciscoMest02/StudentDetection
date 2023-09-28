import React from 'react';

const LoginView = () => {
    async function onSubmit() {
        //event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/submit', {
          method: 'POST',
          body: formData,
        })
     
        // Handle response if necessary
        const data = await response.json()
        // ...
      }

    return (
        <div className='inline-block px-12 py-12 border border-black rounded-2xl'>
            <p className='text-2xl bold font-bold'>¡Bienvenido de vuelta!</p>
            <p className='text-lg'>Inicia sesión para acceder a tu cuenta</p>

            <form onSubmit={onSubmit}>
                <div className='mt-8'>
                    <label htmlFor="mail" className='block font-bold pb-2'>Correo electrónico</label>
                    <input id="mail" type="text" name="mail" placeholder='ejemplo@gmail.com' className='w-96 border border-gray-500 rounded-md px-2 py-2'/>
                </div>
                
                <div className='mt-8'>
                    <label htmlFor="password" className='block font-bold pb-2'>Contraseña</label>
                    <input id="password" type="password" name="password" placeholder='Escribe tu contraseña' className='w-96 border border-gray-500 rounded-md px-2 py-2' />
                </div>

                <div className='grid grid-cols-2 mt-4'>
                    <label>
                        <input type="checkbox" name="agree" value="yes" />
                        <span className='ml-2 text-xs'>Mantener mi sesión iniciada</span>
                    </label>
                    
                    <span className='place-self-end'><a href='#' className='ml-2 text-xs underline font-semibold'>Olvidé mi contraseña</a></span>
                </div>
                <div className='flex justify-center mt-16 '>
                    <button type="submit" className='border px-16 py-2 rounded-xl bg-blue-700 text-white'>Iniciar sesión</button>
                </div>
            </form>

        </div>
    );
}

export default LoginView;