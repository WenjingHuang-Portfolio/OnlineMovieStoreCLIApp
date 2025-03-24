var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var sql = require('mysql2');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors());
var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql666',
    database: "Online Movie Store"
});
connection.connect();
//signup a new user (Add)
app.post('/signup', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, firstName_1, lastName_1, email_1, password_1, role_1, query;
    return __generator(this, function (_b) {
        try {
            _a = req.body, firstName_1 = _a.firstName, lastName_1 = _a.lastName, email_1 = _a.email, password_1 = _a.password, role_1 = _a.role;
            console.log("Firstname", firstName_1);
            console.log("Lastname", lastName_1);
            console.log("Email", email_1);
            console.log("Password", password_1);
            console.log("Role", role_1);
            if (!email_1 || !firstName_1 || !lastName_1 || !password_1 || !role_1) {
                return [2 /*return*/, res
                        .status(400)
                        .json({ error: 'Email, First Name, Last Name, Password and Role are required.' })];
            }
            query = "INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)";
            connection.query(query, [firstName_1, lastName_1, email_1, password_1, role_1], function (err, rows) {
                console.log('err', err);
                console.log('rows', rows);
                res.json({ rows: rows, user: { firstName: firstName_1, lastName: lastName_1, email: email_1, password: password_1, role: role_1 } });
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
//login
app.post('/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, password, query;
    return __generator(this, function (_b) {
        try {
            _a = req.body, email = _a.email, password = _a.password;
            query = "SELECT userID, firstName, email, password, role FROM users WHERE email = ? and password = ?";
            if (!email || !password) {
                return [2 /*return*/, res.status(400).json({ error: 'Email and Password are required.' })];
            }
            connection.query(query, [email, password], function (err, results) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ success: false, message: 'Database error' });
                }
                if (results.length === 0) {
                    return res.status(401).json({ success: false, message: 'Invalid email or password' });
                }
                var user = results[0]; // Get the first matching user
                res.json({ success: true, message: 'Login successful', user: { firstName: user.firstName, email: user.email, role: user.role, id: user.userID } });
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
// |
// | User's authorities below: 
// V
//browsing all movies (View movies data)
app.get('/movies', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        try {
            query = "SELECT * FROM movies";
            connection.query(query, function (err, rows) {
                console.log('error', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
//search for movies by matching similar input words, and show their details
app.post('/movies/:title', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var title, query;
    return __generator(this, function (_a) {
        try {
            title = req.params.title;
            console.log(title);
            query = "SELECT * FROM movies WHERE title LIKE ?";
            connection.query(query, ["%".concat(title, "%")], function (err, rows) {
                console.log('err', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
//Update user's password
app.post('/users/:id/updatepassword', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var password, userID, query;
    return __generator(this, function (_a) {
        password = req.body.password;
        userID = req.params.id;
        console.log(userID);
        try {
            query = "UPDATE users SET password = ? WHERE userID = ?";
            connection.query(query, [password, userID], function (err, rows) {
                console.log('err', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
// |
// | Admin's authorities below: 
// V
//update user info (Update)
app.post('/users/:id/updatefirstname', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var firstName, userID, query;
    return __generator(this, function (_a) {
        firstName = req.body.firstName;
        userID = req.params.id;
        console.log(userID);
        try {
            query = "UPDATE users SET firstName = ? WHERE userID = ?";
            connection.query(query, [firstName, userID], function (err, rows) {
                console.log('err', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
app.post('/users/:id/updatelastname', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var lastName, userID, query;
    return __generator(this, function (_a) {
        lastName = req.body.lastName;
        userID = req.params.id;
        console.log(userID);
        try {
            query = "UPDATE users SET lastName = ? WHERE userID = ?";
            connection.query(query, [lastName, userID], function (err, rows) {
                console.log('err', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
//Locate specific user's details -- for admin to select which user to update
app.post('/users/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userID, query;
    return __generator(this, function (_a) {
        try {
            userID = req.params.id;
            query = "SELECT * FROM users WHERE userID = ?";
            connection.query(query, [userID], function (err, rows) {
                console.log('error', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
//Delete a user -- admin
app.delete('/users/:id/delete', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userID, query;
    return __generator(this, function (_a) {
        try {
            userID = req.params.id;
            query = "DELETE FROM users WHERE userID = ?";
            connection.query(query, [userID], function (err, rows) {
                console.log('err', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
//Get all users ID
app.get('/users', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        try {
            query = "SELECT userID FROM users";
            connection.query(query, function (err, rows) {
                console.log('error', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
//add a new movie (Add) -- Admin
app.post('/movies', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, title, country, releaseYear, rating, genre, description, query;
    return __generator(this, function (_b) {
        try {
            _a = req.body, title = _a.title, country = _a.country, releaseYear = _a.releaseYear, rating = _a.rating, genre = _a.genre, description = _a.description;
            console.log("Title", title);
            console.log("Country", country);
            console.log("Release Year", releaseYear);
            console.log("Rating", rating);
            console.log("Genre", genre);
            console.log("Description", description);
            if (!title || !country || !releaseYear || !rating || !genre) {
                return [2 /*return*/, res
                        .status(400)
                        .json({ error: 'Title, Country, ReleaseYear, Rating, Genre are required.' })];
            }
            query = "INSERT INTO movies (title, country, releaseYear, rating, genre, description) VALUES (?, ?, ?, ?, ?, ?)";
            connection.query(query, [title, country, releaseYear, rating, genre, description], function (err, rows) {
                console.log('err', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
//update movie info (Update)
app.post('/movies/:title/updatedesc', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var description, title, query;
    return __generator(this, function (_a) {
        try {
            description = req.body.description;
            title = req.params.title;
            console.log(title);
            query = "UPDATE movies SET description = ? WHERE title = ?";
            connection.query(query, [description, title], function (err, rows) {
                console.log('err', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
//Delete movies
app.delete('/movies/:title/delete', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var title, query;
    return __generator(this, function (_a) {
        try {
            title = req.params.title;
            query = "DELETE FROM movies WHERE title = ?";
            connection.query(query, [title], function (err, rows) {
                console.log('err', err);
                console.log('rows', rows);
                res.json(rows);
            });
        }
        catch (err) {
            console.error(err.message);
            return [2 /*return*/, res.status(500).json({ error: 'Internal server error.' })];
        }
        return [2 /*return*/];
    });
}); });
app.listen(4000, function () {
    console.log('server is running on port 4000');
});
