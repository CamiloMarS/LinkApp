const express = require("express");
const router = express.Router();

const pool_db = require("../database"); //Hace referencia a la conexion de db   

router.get("/add", (req, res) => {
     res.render('links/add');
});

router.post("/add", async (request, response)=> { 

     const { title, url, description } = request.body;

     const newLink = {
          title,
          url,
          descripcion: description
     };
     console.log("NEWLINK ", newLink);
     await pool_db.query('INSERT INTO links set ?', [newLink]); //Peticion asincrona
     response.redirect("/links");
});

//Consulta asyncrona
router.get("/", async (req, resp) => {
     const links = await pool_db.query('SELECT * FROM links');
     resp.render('links/list', { links_pages: links });
});

module.exports = router;