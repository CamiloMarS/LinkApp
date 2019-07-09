const mysql = require('mysql'); //no soporta promesas, ni sync/await
const { promisify } = require("util"); //convierte código callback a promesas(soperte)
const { database } = require('./keys');

//Conexion a la bd 
const pool = mysql.createPool(database); //Tienen hilos se ejecutan una tarea secuencial

//Usar la conexión
pool.getConnection((error, connection)=>{
     if(error){
          if(error.code === 'PROTOCOL_CONECTION_LOST'){
               console.error("CONECCIÓN DB CERRADA ", error);
          }
          if(error.code === 'ER_CON_COUNT_ERROR'){
               console.error("Database has many connections ", error);
          }
          if(error.code === 'ECONNREFUSED'){
               console.log("ERROR CONECTIONS WAR REFUSED ", error);
          }
     }

     if(connection) connection.release(); //emppieza la conexion
     console.log("DB is Connected");
}); //Abrir conexion

//Convertir Callbacks en promesas
pool.query =  promisify(pool.query);

module.exports = pool;

