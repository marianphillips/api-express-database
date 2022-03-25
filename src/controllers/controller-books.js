const booksRepository = require('../repositories/repository-books')

const getBooks = (req, res) => {
    let page = 0
    let perPage = 20
    
    if(req.query.page) {
    page = parseInt(req.query.page) - 1
    }
    if(req.query.perPage) {
    perPage = parseInt(req.query.perPage)
    }
    
    const offsetNumber = page * perPage

    const type = req.query.type

    if(type !== null) {
        return booksRepository.getBooks(perPage, offsetNumber, type)
        .then((result) => {
          res.json({ books: result });
        })
        .catch((error) => {
          res.status(500);
          res.json({ error: "Unexpected Error" });
        });
    }
    
    else {
     return booksRepository.getBooks(perPage, offsetNumber)
        .then((result) => {
          res.json({ books: result });
        })
        .catch((error) => {
          res.status(500);
          res.json({ error: "Unexpected Error" });
        });
    }

    };

    const getBookById = (req, res) => {
        const id = req.params.id
        
        return booksRepository.getBookById(id)
        .then((result) => {
             if(result.length === 0) {
                 res.status(404)
                 res.json({error : "book does not exist"})
             } 
             else {
            res.json({ books: result[0]});
             }
          })
          .catch((error) => {
            res.status(500);
            res.json({ error: "Unexpected Error" });
          });
    }

    const addBook = (req, res) => {
        const book = req.body
       return booksRepository.addBook(book)
        .then((result) => {
            res.json({ books: result});
          })
          .catch((error) => {
            res.status(500);
            res.json({ error: "Unexpected Error" });
          });
    }

    module.exports = {
        getBooks,
        getBookById,
        addBook
    }
    
    //Stuff for first bit lol
    // if(req.query.type) {
//     db.query(`SELECT * FROM books WHERE type LIKE $1`, [req.query.type])
//     .then((result) => {
//       res.json({ books: result.rows });
//     })
//     .catch((error) => {
//       res.status(500);
//       res.json({ error: "Unexpected Error" });
//     });
// }

// else if(req.query.topic) {
//     db.query(`SELECT * FROM books WHERE topic LIKE %$1%`, [req.query.topic])
//     .then((result) => {
//       res.json({ books: result.rows });
//     })
//     .catch((error) => {
//       res.status(500);
//       res.json({ error: "Unexpected Error" });
//     });
// }