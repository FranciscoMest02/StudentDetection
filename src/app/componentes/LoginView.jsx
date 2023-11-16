import React, { useState } from 'react';
import { manageAuth } from '../controllers/apiController';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie'

const LoginView = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    async function onSubmit(event) {
        event.preventDefault()
        setLoading(true)
     
        const formData = new FormData(event.currentTarget)
        const user = formData.get('mail') 
        const pass = formData.get('password')

        const ans = await manageAuth(user, pass)

        if (ans.status === 'ok') {
            cookie.set('id', ans.id)
            if(ans.role === 'student'){
                router.push('/pages/student/' + ans.id)            
            } else if (ans.role === 'teacher') {
                router.push('/pages/grupos') 
            }
        } else {
            // Display an error message or perform other actions for invalid credentials
            setLoading(false)
            alert('Invalid username or password');
        }
      }

    return (
        <div className='inline-block bg-white px-12 py-12 rounded-2xl'>
            <p className='text-2xl bold font-bold'>¡Bienvenido de vuelta!</p>
            <p className='text-lg'>Inicia sesión para acceder a tu cuenta</p>

            <form onSubmit={onSubmit}>
                <div className='mt-8'>
                    <label htmlFor="mail" className='block font-bold pb-2'>Nombre de usuario</label>
                    <input id="mail" type="text" name="mail" placeholder='Escribe tu nombre de usuario' className='w-96 border border-gray-500 rounded-md px-2 py-2' disabled={loading}/>
                </div>
                
                <div className='mt-8'>
                    <label htmlFor="password" className='block font-bold pb-2'>Contraseña</label>
                    <input id="password" type="password" name="password" placeholder='Escribe tu contraseña' className='w-96 border border-gray-500 rounded-md px-2 py-2' disabled={loading}/>
                </div>

                <div className='grid grid-cols-2 mt-4'>
                    <label>
                        <input type="checkbox" name="agree" value="yes" />
                        <span className='ml-2 text-xs'>Mantener mi sesión iniciada</span>
                    </label>
                    
                    <span className='place-self-end'><a className='ml-2 text-xs underline font-semibold'>Olvidé mi contraseña</a></span>
                </div>
                <div className='flex justify-center mt-16 '>
                    <button type="submit" className={'border px-16 py-2 rounded-xl bg-blue-700 text-white ' + (!loading ? 'bg-blue-600' : 'bg-blue-900')} disabled={loading}>{!loading ? 'Iniciar sesión' : 'Verificando...'}</button>
                </div>
            </form>

        </div>
    );
}

export default LoginView;