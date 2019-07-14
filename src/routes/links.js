const express = require("express");
const router = express.Router();
const LOGGER = console.log;

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
     LOGGER("START CONNECTION LINK ::: ", newLink);
     await pool_db.query('INSERT INTO links set ?', [newLink]); //Async Request
     request.flash('msg_success', 'link saved successfully'.toUpperCase());
     response.redirect("/links");
});

//Consulta asyncrona
router.get("/", async (req, resp) => {
     const links = await pool_db.query('SELECT * FROM links');
     resp.render('links/list', { links_pages: links });
});

router.get("/delete/:id", async ( request, response ) => {

     const { id } = request.params;
     LOGGER("\nElinar registro ::: ", id);

     //Delete to database 
     const respuesta = await pool_db.query('DELETE FROM links WHERE id = ?', [id]);
     LOGGER("Respuesta ::: ", JSON.stringify(respuesta) + "\n");
     const { affectedRows } = respuesta;
     
     if(affectedRows) {
          //Alert success
          request.flash('msg_delete', `Registry successfully deleted`.toUpperCase());
          response.redirect('/links');
     }
});

router.get("/edit/:id", async (req, resp) => {
     const id = req.params.id;
     LOGGER("\nLint will Edit :::", id);
     
     if(!id) return;

     LOGGER("\nQuery Init :::", id);
     const oldDataLink = await pool_db.query("SELECT * FROM links WHERE id =?", [id]);

     LOGGER("Query Response :::", oldDataLink[0]);

     resp.render("links/edit", {link: oldDataLink[0]});
});

//Update link 
router.post("/edit/:id", async ( req, resp ) => {
     const { id } = req.params;
     const { title, url, description } = req.body;
     const linkEdit = { title, url, descripcion:description };

     LOGGER(`New Data Edit -> ${id} ::: `, linkEdit);
     LOGGER("Init update ::: ...");
     let update = await pool_db.query('UPDATE links SET ? WHERE id = ?', [linkEdit, id]);
     LOGGER("Response updated ::: ", JSON.stringify(update));
     req.flash('msg_edit', 'Registry successfully updated'.toUpperCase());
     resp.redirect("/links");
});

module.exports = router;