# Grupo_9_Parcial2_BD2_Div133
---
## ¿Qué hace el programa?
El programa se encarga de gestionar la cartelera de un cine en MongoDB utilizando Node.js. A partir de las 3 colecciones (películas, directores y reseñas) relacionadas dentro de nuestra base de datos realizamos las operaciones de agrupamiento por puntaje de películas, ordenamiento por su fecha de estreno y filtración por la nacionalidad de los directores.

¿Cómo ejecutarlo?
1. Instalar en la computadora Node.js, MongoDB (en el puerto 27017). 
2. Vincular el Visual Studio Code con MongoDB 
3. Clonar el repositorio
	git clone https://github.com/LuciaRamundo/Grupo_9_Parcial2_BD2_Div133.git
	cd Grupo_9_Parcial2_BD2_Div133
4. Instalar la dependencia de mongo con el comando ”npm install mongodb”
5. Ejecutar el archivo con el comando “node index.js”

Descripción de las colecciones y la estructura del modelo.
Las 3 colecciones cuentan con id.
Directores: almacena los datos de los directores, tales como: nombre y nacionalidad.
Películas: almacena los datos de las películas, tales como: título y fecha de estreno. Además tiene una relación por referencia con la colección directores a partir de director_id.
Reseñas: almacena los datos de las reseñas, tales como: comentario y puntaje. Además tiene una relación por referencia con la colección películas a partir de pelicula_id.

Justificación de las decisiones de diseño.
El primer aggregation pipeline que utilizamos fué el $group con el objetivo de agrupar los puntajes de las películas (con el mismo id) y obtener el promedio. 
El segundo aggregation pipeline que utilizamos fué el $sort con el objetivo de ordenar las películas por fecha de estreno de manera descendente (de la más actual a la más antigua).
El tercer aggregation pipeline que utilizamos fué el $match con el objetivo de filtrar/mostrar los directores con la misma nacionalidad (Britanico).
