const express = require('express')
const sql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())



const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql666',
    database: `Online Movie Store`
})

connection.connect()


interface Movie {
    movieID: number
    title: string
    country: string
    releaseYear: number
    rating: string
    genre: string
    description: string
}

interface User {
    userID: number
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
    createdTime: string
}



//signup a new user (Add)
app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body
        console.log("Firstname", firstName)
        console.log("Lastname", lastName)
        console.log("Email", email)
        console.log("Password", password)
        console.log("Role", role)

        if (!email || !firstName || !lastName || !password || !role) {
            return res
                .status(400)
                .json({ error: 'Email, First Name, Last Name, Password and Role are required.' })
        }

        let query = "INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)"
        connection.query(query, [firstName, lastName, email, password, role], (err, rows) => {
            console.log('err', err)
            console.log('rows', rows)
            res.json({ rows, user: { firstName, lastName, email, password, role } })
        })
    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }

})

//login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        let query = "SELECT userID, firstName, email, password, role FROM users WHERE email = ? and password = ?"

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and Password are required.' });
        }

        connection.query(query, [email, password], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            const user = results[0]; // Get the first matching user
            res.json({ success: true, message: 'Login successful', user: { firstName: user.firstName, email: user.email, role: user.role, id: user.userID } });
        });

    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }

})

// |
// | User's authorities below: 
// V

//browsing all movies (View movies data)
app.get('/movies', async (req, res) => {
    try {
        let query = "SELECT * FROM movies"
        connection.query(query, (err, rows) => {
            console.log('error', err)
            console.log('rows', rows)
            res.json(rows)
        })
    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }

})
//search for movies by matching similar input words, and show their details
app.post('/movies/:title', async (req, res) => {
    try {
        const title = req.params.title
        console.log(title)
        let query = "SELECT * FROM movies WHERE title LIKE ?"
        connection.query(query, [`%${title}%`], (err, rows) => {
            console.log('err', err)
            console.log('rows', rows)
            res.json(rows)
        })
    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }

})

//Update user's password
app.post('/users/:id/updatepassword', async (req, res) => {
    const { password } = req.body
    const userID = req.params.id
    console.log(userID)

    try {
        let query = "UPDATE users SET password = ? WHERE userID = ?"
        connection.query(query, [password, userID], (err, rows) => {
            console.log('err', err)
            console.log('rows', rows)
            res.json(rows)
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }
})

// |
// | Admin's authorities below: 
// V

//update user info (Update)
app.post('/users/:id/updatefirstname', async (req, res) => {
    const { firstName } = req.body
    const userID = req.params.id
    console.log(userID)

    try {
        let query = "UPDATE users SET firstName = ? WHERE userID = ?"
        connection.query(query, [firstName, userID], (err, rows) => {
            console.log('err', err)
            console.log('rows', rows)
            res.json(rows)
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }
})

app.post('/users/:id/updatelastname', async (req, res) => {
    const { lastName } = req.body
    const userID = req.params.id
    console.log(userID)

    try {
        let query = "UPDATE users SET lastName = ? WHERE userID = ?"
        connection.query(query, [lastName, userID], (err, rows) => {
            console.log('err', err)
            console.log('rows', rows)
            res.json(rows)
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }
})

//Locate specific user's details -- for admin to select which user to update
app.post('/users/:id', async (req, res) => {
    try {
        const userID = req.params.id
        let query = "SELECT * FROM users WHERE userID = ?"
        connection.query(query, [userID], (err, rows) => {
            console.log('error', err)
            console.log('rows', rows)
            res.json(rows)
        })
    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }
})

//Delete a user -- admin
app.delete('/users/:id/delete', async (req, res) => {
    try {
        const userID = req.params.id

        let query = "DELETE FROM users WHERE userID = ?"
        connection.query(query, [userID], (err, rows) => {
            console.log('err', err)
            console.log('rows', rows)
            res.json(rows)
        })
    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }
})
//Get all users ID
app.get('/users', async (req, res) => {
    try {
        let query = "SELECT userID FROM users"
        connection.query(query, (err, rows) => {
            console.log('error', err)
            console.log('rows', rows)
            res.json(rows)
        })
    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }
})

//add a new movie (Add) -- Admin
app.post('/movies', async (req, res) => {
    try {
        const { title, country, releaseYear, rating, genre, description } = req.body
        console.log("Title", title)
        console.log("Country", country)
        console.log("Release Year", releaseYear)
        console.log("Rating", rating)
        console.log("Genre", genre)
        console.log("Description", description)

        if (!title || !country || !releaseYear || !rating || !genre) {
            return res
                .status(400)
                .json({ error: 'Title, Country, ReleaseYear, Rating, Genre are required.' })
        }
        let query = "INSERT INTO movies (title, country, releaseYear, rating, genre, description) VALUES (?, ?, ?, ?, ?, ?)"
        connection.query(query, [title, country, releaseYear, rating, genre, description], (err, rows) => {
            console.log('err', err)
            console.log('rows', rows)
            res.json(rows)
        })
    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }

})

//update movie info (Update)
app.post('/movies/:title/updatedesc', async (req, res) => {
    try {
        const { description } = req.body
        const title = req.params.title
        console.log(title)

        let query = "UPDATE movies SET description = ? WHERE title = ?"
        connection.query(query, [description, title], (err, rows) => {
            console.log('err', err)
            console.log('rows', rows)
            res.json(rows)
        })
    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }

})

//Delete movies
app.delete('/movies/:title/delete', async (req, res) => {
    try {
        const title = req.params.title

        let query = "DELETE FROM movies WHERE title = ?"
        connection.query(query, [title], (err, rows) => {
            console.log('err', err)
            console.log('rows', rows)
            res.json(rows)
        })
    }
    catch (err) {
        console.error(err.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }

})

app.listen(4000, () => {
    console.log('server is running on port 4000')
})