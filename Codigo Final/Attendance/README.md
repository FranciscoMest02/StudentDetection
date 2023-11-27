# Guía para correr el código de Registro de Asistencia

Primero, hay que instalar lo siguiente:
* Para Mac:
  * `brew update`
  * `brew install cmake gcc`

* Para Windows:
  * `choco install mingw`


Luego, hay que crear un ambiente virtual.
Para Mac: 
* `python3.10.0 -m venv env`
* `source env/bin/activate`

Instalamos todas las librerías necesarias con el siguiente comando:
* `pip install -r requirements.txt`

Para correr el código de Reconocimiento de Rostros, se debe escribir el siguiente comando:
* `python detector.py` ó `python3 detector.py`

Al correrlo, deberá aparecer una pequeña interfaz con 2 opciones:
1. **Register New Face**: (Registrar una nueva cara/estudiante)
   1. Al dar click, se iniciará la cámara del celular o de la computadora.
   2. El usuario deberá de tomar la foto para registrarla. Para tomar la foto, se deberá dar click en la tecla "c".
   3. Después de tomar la foto, el usuario/estudiante deberá escribir su nombre en la consola. Al escribirlo, dar click en "Enter"
   4. El estudiante se registra en la base de datos automáticamente y se retorna un id único del estudiante. Con ese ID se le reconocerá en el reconocimiento en vivo y con él podrá consultar sus datos de asistencia y participación.


2. **Start Live Recognition** (Iniciar Reconocimiento Facial)
   1. Al dar click, se iniciará la cámara del celular o de la computadora.
   2. Los alumnos deberán pasar uno por uno frente a la cámara, y así se irá registrando su asistencia para el día actual. 
   3. En pantalla se mostrará un recuadro en la cara del estudiante con el id identificado.
