const db = require("../utils/database");

const getBooks = (perPage, offsetNumber, type = null) => {

        if(type) {
        return (    
    db.query(`SELECT * FROM books WHERE lower(type) LIKE $1 LIMIT $2 OFFSET $3`, [type, perPage, offsetNumber])
    .then((result) => result.rows)
    .catch((error) => {
     throw new Error('Database Error')
    })
)
}

else {
     return (
      db.query("SELECT * FROM books LIMIT $1 OFFSET $2", [perPage, offsetNumber])
        .then(result => result.rows)
        .catch((error) => {
          throw new Error("Database Error")
        })
     )
    }
}

const getBookById = (id) => {
    return (
    db
    .query(`SELECT * FROM books WHERE id = $1`, [id])
    .then((result) => result.rows)
    .catch((error) => {
            throw new Error("Database Error")
          })
    )

}

const addBook = (book) => {
    const insertSQL = `INSERT INTO books (title, type, author, topic, publicationDate, pages) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *;`
    
    const bookValues = [
        book.title,
        book.type,
        book.author,
        book.topic,
        book.publicationDate,
        book.pages
    ]

    return (
  db.query(insertSQL, bookValues)
    .then(result => result.rows[0])
    .catch((error) => {
        throw new Error("Database Error")
    })
    )
}

const editBook = (book) => {
    const putSQL = 'UPDATE books SET title = $1, type = $2, author = $3, topic = $4, publicationDate = $5, pages = $6 WHERE id = $7 RETURNING *'

    const bookValues = [
        book.body.title,
        book.body.type,
        book.body.author,
        book.body.topic,
        book.body.publicationDate,
        book.body.pages,
        book.params.id   
    ]

    return (
    db.query(putSQL, bookValues)
    .then(result => result.rows[0])
    .catch((error) => {
        throw new Error("Database Error")
    })
    )
}

const deleteBook = (book) => {
    const deleteSQL = "DELETE FROM books WHERE id = $1 RETURNING *"

    return (
        db.query(deleteSQL, [book.params.id])
        .then(result => result.rows[0])
        .catch((error) => {
            throw new Error("Database Error")
        })
    )
}

module.exports = {
    getBooks,
    getBookById,
    addBook,
    editBook,
    deleteBook
}