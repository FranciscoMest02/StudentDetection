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
        <>
            <div>
                <p>Bienvenido de vuelta</p>
                <p>Inicia sesión para acceder a tu cuenta</p>

                <form onSubmit={onSubmit}>
                    <label for="mail">Correo electronico</label>
                    <input id="mail" type="text" name="mail" />
                    
                    <label for="password">Contraseña</label>
                    <input id="password" type="password" name="password" />

                    <p>Mantenerme loggeado</p>

                    <p><a>Olvidé mi contraseña</a></p>

                    <button type="submit">Submit</button>
                </form>

            </div>
        </>
    );
}

export default LoginView;