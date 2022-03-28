const express = require('express')
const petsRouter = express.Router()
const db = require('../utils/database')

petsRouter.get('/', (req, res) => {
db
.query('SELECT * FROM pets')
.then(result => {
    res.json({pets: result.rows})
})
.catch((error) => {
    res.status(500)
    res.json({error: "Unexpected Error"})
})
})

petsRouter.get("/:id", (req, res) => {
    db
    .query(`SELECT * FROM pets WHERE id = $1`, [req.params.id])
    .then((result) => {
         if(result.rowCount === 0) {
             res.status(404)
             res.json({error : "pet does not exist"})
         } 
         else {
        res.json({ pet: result.rows[0]});
         }
      })
      .catch((error) => {
        res.status(500);
        res.json({ error: "Unexpected Error" });
      });
  });
  
  petsRouter.post("/", (req, res) => {
      const insertSQL = `INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5)  RETURNING *;`
      
      const petValues = [
          req.body.name,
          req.body.age,
          req.body.type,
          req.body.breed,
          req.body.microchip
      ]
  
    db.query(insertSQL, petValues)
      .then((result) => {
        res.json({ pets: result.rows[0] });
      })
      .catch((error) => {
        res.status(500);
        res.json({ error: "Unexpected Error" });
      });
  });

  petsRouter.put("/:id", (req, res) => {
    const putSQL = 'UPDATE pets SET name = $1,  age = $2,  type = $3,  breed = $4,  microchip = $5 WHERE id = $6 RETURNING *'

    const petValues = [
      req.body.name,
      req.body.age,
      req.body.type,
      req.body.breed,
      req.body.microchip,
      req.params.id
  ]

    db.query(putSQL, petValues)
    .then(result => {
    res.json({pets: result.rows[0]})
   })
    .catch((error) => {
    res.status(500)
    res.json({error: "Unexpected Error"})
})
})

petsRouter.delete("/:id", (req, res) => {
 const deleteSQL = "DELETE FROM pets WHERE id = $1 RETURNING *"

 db.query(deleteSQL, [req.params.id])
 .then(results => res.json({pets: results.rows[0]}))
 .catch((error) => {
   res.status(500)
   res.json({error: "Unexpected Error"})
 })
});

module.exports = petsRouter