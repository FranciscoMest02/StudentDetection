# Guía para correr el código de Registro de Participación

En caso de que no se haya hecho ya, crear ambiente virtual:
Para Mac: 
* `python3.10.0 -m venv env`
* `source env/bin/activate`

Instalamos todas las librerías necesarias con el siguiente comando:
* `pip install -r requirements.txt`

Verificar que los archivos `yolov3.cfg` y `yolov3.weights` estén presentes en la carpeta.
En caso de que falte alguno, se pueden descargar del siguiente link: 
https://drive.google.com/drive/folders/1SmRotZ0sJg3sqWP6tCN-wxN0MFgTbDdC?usp=sharing

Para correr el código de Registro de Participación, se debe escribir el siguiente comando:
* `python participation.py` ó `python3 participation.py`

Al correr el código, se mostrará en consola una lista de cursos. El profesor deberá seleccionar el curso correspondiente de la lista de cursos existentes. Deberá escribir exactamente el nombre del curso para que se pueda proceder a la toma de participación.

Se selecciona uno de los cursos, y la cámara se enciende automáticamente.

Al finalizar la clase, el profesor debe dar click en la tecla "q" para terminar la grabación y automáticamente se procesarán las participaciones en clase.
