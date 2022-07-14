/* Dependencias */
// npm install package_name
// axios es async/await
// axios trabaja con verbos HTTP
const axios = require('axios');
// Interactuar con el sistema de archivos
const fs = require('fs').promises; // promises se agrega porque es especifico del paquete fs(file system) -> generar archivos
const path = require('path');

const main = async () => {
  let response = await axios.get('https://rickandmortyapi.com/api/character');

  let {
    data: {
      results
    }
  } = response;

  // definir datos a obtener
  let header = 'id,nombre,estado,especie';
  let characters = results.map((character) => {
      return {
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species
      };
      //Haremos otro map para scar unicam,ente los valores
      //Object.values(var) , retorna un arreglo con los valores del objeto
      //join(), une los elementos de una matriz y el parameto es el separador
      //Creamos un archivo CSV (separado por comas)
    }).map((personaje) => Object.values(personaje).join(','))
    // Segundo join agrega salto de lineas
    .join('\n')

  //Agregar header al csv

  const archivo = (header + '\n' + characters)
  // let archivo = header.concat('\n' + characters);
  console.log(archivo)
  // Crear archivo CSV
  //await fs.writeFile(path.join(__dirname, 'data.csv'), archivo);

  //Usaremos path junto a variable global de NODE, __dirnameme
  //console.log(path.join(__dirname, 'data.csv'));
}

main();


// Ejecutamos el codigo con NODE
// terminal node index.js (archivo)
// Para axios nos interesa data:{...} del JSON