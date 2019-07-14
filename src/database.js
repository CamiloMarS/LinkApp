const mysql = require('mysql'); //no soporta promesas, ni sync/await
const { promisify } = require("util"); //convierte código callback a promesas(soperte)
const { database } = require('./keys');

//connection to db
const pool = mysql.createPool(database); //Tienen hilos se ejecutan una tarea secuencial

//use connection
pool.getConnection((error, connection)=>{
     if(error){
          if(error.code === 'PROTOCOL_CONECTION_LOST'){
               console.error("CLOSED CONNECTION ", error);
          }
          if(error.code === 'ER_CON_COUNT_ERROR'){
               console.error("DATABASE HAS MANY CONNECTIONS ", error);
          }
          if(error.code === 'ECONNREFUSED'){
               console.log("ERROR CONECTIONS WAR REFUSED ", error);
          }
          return;
     }

     if(connection) connection.release(); //start connection
     console.log("DB is Connected");
}); 

//Convert callbacks into promises
pool.query =  promisify(pool.query);

module.exports = pool;

