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
var inquirer = require('inquirer');
//signup a new user (Add)
function signup() {
    return __awaiter(this, void 0, void 0, function () {
        var newUser, url, requestData, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'Your first name'
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'Your last name'
                        },
                        {
                            type: 'input',
                            name: 'email',
                            message: 'Your email'
                        },
                        {
                            type: 'input',
                            name: 'password',
                            message: 'Create your password'
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'Role of your account',
                            choices: ['admin', 'user'],
                            default: 'user'
                        }
                    ])];
                case 1:
                    newUser = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    url = 'http://localhost:4000/signup';
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newUser),
                        })];
                case 3:
                    requestData = _a.sent();
                    return [4 /*yield*/, requestData.json()];
                case 4:
                    response = _a.sent();
                    if (requestData.status === 200 && response.length !== 0) {
                        console.log("\u2705 Account created successfully!");
                        return [2 /*return*/, response.user];
                    }
                    else {
                        console.error("\u274C Account failed to be created, something went wrong.");
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('An error occurred:', error_1.message);
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//User Login
var currentUserID = null; //globally store the current logged-in user's ID
function login() {
    return __awaiter(this, void 0, void 0, function () {
        var credentials, requestData, response, responseData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([
                        {
                            type: 'input',
                            name: 'email',
                            message: 'Enter your email:',
                        },
                        {
                            type: 'password',
                            name: 'password',
                            message: 'Enter your password:',
                        },
                    ])];
                case 1:
                    credentials = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    requestData = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials),
                    };
                    return [4 /*yield*/, fetch('http://localhost:4000/login', requestData)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    responseData = _a.sent();
                    if (response.ok && responseData.success) {
                        currentUserID = responseData.user.id;
                        console.log("\u2705 Welcome, ".concat(responseData.user.firstName, "!"));
                        console.log(currentUserID);
                        return [2 /*return*/, responseData.user]; // Return user object
                    }
                    else {
                        console.error('❌ Login failed:', responseData.message || 'Invalid username or password. Please try again.');
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error('An error occurred:', error_2.message);
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// |
// | User's authorities below: 
// V
//Browsing the list of all movies, and view details of a selected movie data
function BrowseMovies() {
    return __awaiter(this, void 0, void 0, function () {
        var response, movies, allMovies, _i, movies_1, movie_1, selectedMovieTitle, title, url, movieDetail, movie, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, fetch('http://localhost:4000/movies', {
                            method: 'GET'
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    movies = _a.sent();
                    console.log(movies);
                    allMovies = [];
                    for (_i = 0, movies_1 = movies; _i < movies_1.length; _i++) {
                        movie_1 = movies_1[_i];
                        allMovies.push(movie_1.title);
                    }
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'title',
                                message: 'What movie do you want to watch?',
                                choices: allMovies
                            },
                        ])
                        //Show details of the selected movie
                    ];
                case 3:
                    selectedMovieTitle = _a.sent();
                    return [4 /*yield*/, selectedMovieTitle.title]; //Let ${title} know this title is the selected title
                case 4:
                    title = _a.sent() //Let ${title} know this title is the selected title
                    ;
                    url = "http://localhost:4000/movies/".concat(title);
                    console.log(title);
                    console.log(url); //Print title and url correctly
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(selectedMovieTitle),
                        })];
                case 5:
                    movieDetail = _a.sent();
                    return [4 /*yield*/, movieDetail.json()];
                case 6:
                    movie = _a.sent();
                    if (movieDetail.status === 200 && movie.length !== 0) {
                        console.log(movie);
                        return [2 /*return*/, movieDetail];
                    }
                    else {
                        console.error('Invalid title. Please try again.');
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    console.error('An error occurred:', error_3.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
//search for movies by matching similar input words, and show their details
function searchMovies() {
    return __awaiter(this, void 0, void 0, function () {
        var movieInfo, title, url, response, movie, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([
                        {
                            type: 'input',
                            name: 'title',
                            message: 'Enter Movie Name',
                        },
                    ])];
                case 1:
                    movieInfo = _a.sent();
                    return [4 /*yield*/, movieInfo.title];
                case 2:
                    title = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    url = "http://localhost:4000/movies/".concat(title);
                    console.log(url);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(movieInfo),
                        })];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    movie = _a.sent();
                    if (response.status === 200 && movie.length !== 0) {
                        console.log(movie);
                        return [2 /*return*/, response];
                    }
                    else {
                        console.error("\u274C No movie found. Please try again.");
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.error('An error occurred:', error_4.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
//Update user's password -- either user or admin can (only) do it for themselves
function updatePassword() {
    return __awaiter(this, void 0, void 0, function () {
        var updatePassword, requestUpdatePassword, responseUpdatePassword, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(currentUserID);
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'input',
                                name: 'password',
                                message: 'Enter your new password:'
                            }
                        ])];
                case 1:
                    updatePassword = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch("http://localhost:4000/users/".concat(currentUserID, "/updatepassword"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatePassword),
                        })];
                case 3:
                    requestUpdatePassword = _a.sent();
                    return [4 /*yield*/, requestUpdatePassword.json()];
                case 4:
                    responseUpdatePassword = _a.sent();
                    if (requestUpdatePassword.status === 200 && responseUpdatePassword.length !== 0) {
                        console.log("\u2705 User ID " + currentUserID + " password updated successfully");
                        return [2 /*return*/, responseUpdatePassword];
                    }
                    else {
                        console.error("\u274C User's password failed to be updated, something went wrong.");
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.error('An error occurred:', err_1.message);
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// |
// | Admin's authorities below: 
// V
//Update User Details -- containing firstName and lastName -- only for admin
function updateUser() {
    return __awaiter(this, void 0, void 0, function () {
        var getUser, id, url, requestData, response, updateChoices, updateUser_1, updateFirstName, requestUpdateFirstName, responseUpdateFirstName, updateLastName, requestUpdateLastName, responseUpdateLastName, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([
                        {
                            type: 'input',
                            name: 'userID',
                            message: 'Enter User ID',
                        },
                    ])];
                case 1:
                    getUser = _a.sent();
                    return [4 /*yield*/, getUser.userID];
                case 2:
                    id = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 15, , 16]);
                    url = "http://localhost:4000/users/".concat(id);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(getUser),
                        })];
                case 4:
                    requestData = _a.sent();
                    return [4 /*yield*/, requestData.json()];
                case 5:
                    response = _a.sent();
                    console.log(response);
                    updateChoices = ['First Name', 'Last Name'];
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'property',
                                message: 'Which property do you want to update?',
                                choices: updateChoices
                            }
                        ])];
                case 6:
                    updateUser_1 = _a.sent();
                    console.log("You are updating User " + id + updateUser_1.property);
                    if (!(updateUser_1.property === 'First Name')) return [3 /*break*/, 10];
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'input',
                                name: 'firstName',
                                message: 'Enter your new first name:'
                            }
                        ])];
                case 7:
                    updateFirstName = _a.sent();
                    return [4 /*yield*/, fetch("http://localhost:4000/users/".concat(id, "/updatefirstname"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updateFirstName),
                        })];
                case 8:
                    requestUpdateFirstName = _a.sent();
                    return [4 /*yield*/, requestUpdateFirstName.json()];
                case 9:
                    responseUpdateFirstName = _a.sent();
                    if (requestUpdateFirstName.status === 200 && responseUpdateFirstName.length !== 0) {
                        console.log("\u2705 User ID " + id + " firstname updated successfully");
                        return [2 /*return*/, responseUpdateFirstName];
                    }
                    else {
                        console.error("\u274C User's detail failed to be updated, something went wrong.");
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 14];
                case 10: return [4 /*yield*/, inquirer.prompt([
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'Enter your new last name:'
                        }
                    ])];
                case 11:
                    updateLastName = _a.sent();
                    return [4 /*yield*/, fetch("http://localhost:4000/users/".concat(id, "/updatelastname"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updateLastName),
                        })];
                case 12:
                    requestUpdateLastName = _a.sent();
                    return [4 /*yield*/, requestUpdateLastName.json()];
                case 13:
                    responseUpdateLastName = _a.sent();
                    if (requestUpdateLastName.status === 200 && responseUpdateLastName.length !== 0) {
                        console.log("\u2705 User ID " + id + " last name updated successfully");
                        return [2 /*return*/, responseUpdateLastName];
                    }
                    else {
                        console.error("\u274C User's detail failed to be updated, something went wrong.");
                        return [2 /*return*/, null];
                    }
                    _a.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    err_2 = _a.sent();
                    console.error('An error occurred:', err_2.message);
                    return [2 /*return*/, null];
                case 16: return [2 /*return*/];
            }
        });
    });
}
//Delete a user -- admin
function deleteUser() {
    return __awaiter(this, void 0, void 0, function () {
        var response, users, allUsers, _i, users_1, user, deleteUser, id, url, requestData, response_1, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:4000/users', {
                        method: 'GET'
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    users = _a.sent();
                    allUsers = [];
                    for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                        user = users_1[_i];
                        allUsers.push(user.userID);
                    }
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'userID',
                                message: 'Which user you want to delete?',
                                choices: allUsers
                            }
                        ])];
                case 3:
                    deleteUser = _a.sent();
                    return [4 /*yield*/, deleteUser.userID];
                case 4:
                    id = _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 8, , 9]);
                    url = "http://localhost:4000/users/".concat(id, "/delete");
                    console.log(url);
                    return [4 /*yield*/, fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(deleteUser),
                        })];
                case 6:
                    requestData = _a.sent();
                    return [4 /*yield*/, requestData.json()];
                case 7:
                    response_1 = _a.sent();
                    if (requestData.status === 200 && response_1.length !== 0) {
                        console.log("\u2705 User " + id + " deleted successfully!");
                        return [2 /*return*/, response_1];
                    }
                    else {
                        console.error("\u274C The User isn't deleted, something went wrong.");
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 9];
                case 8:
                    error_5 = _a.sent();
                    console.error('An error occurred:', error_5.message);
                    return [2 /*return*/, null];
                case 9: return [2 /*return*/];
            }
        });
    });
}
//add a new movie (Add) -- Admin
function addMovie() {
    return __awaiter(this, void 0, void 0, function () {
        var newMovie, url, requestData, response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([
                        {
                            type: 'input',
                            name: 'title',
                            message: 'Movie title'
                        },
                        {
                            type: 'input',
                            name: 'country',
                            message: 'Country'
                        },
                        {
                            type: 'input',
                            name: 'releaseYear',
                            message: 'Release year'
                        },
                        {
                            type: 'list',
                            name: 'rating',
                            message: 'Rating',
                            choices: ['G', 'PG', 'PG-13', 'R', 'Not Rated'],
                            default: 'G'
                        },
                        {
                            type: 'checkbox',
                            name: 'genre',
                            message: 'Select the movie genres',
                            choices: ['Drama', 'Romance', 'Crime', 'Animation',
                                'Action', 'Adventure', 'Sci-Fi', 'Fantasy', 'Comedy',
                                'Mystery', 'Thriller']
                        },
                        {
                            type: 'input',
                            name: 'description',
                            message: 'Movie description'
                        }
                    ])];
                case 1:
                    newMovie = _a.sent();
                    newMovie.genre = newMovie.genre.join(', ');
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    url = 'http://localhost:4000/movies';
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newMovie),
                        })];
                case 3:
                    requestData = _a.sent();
                    return [4 /*yield*/, requestData.json()];
                case 4:
                    response = _a.sent();
                    if (requestData.status === 200 && response.length !== 0) {
                        console.log("\u2705 " + newMovie.title + ' added successfully!');
                        return [2 /*return*/, response];
                    }
                    else {
                        console.error("\u274C Movie isn't added, something went wrong.");
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_6 = _a.sent();
                    console.error('An error occurred:', error_6.message);
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//update movie info (Update)
function updateMovie() {
    return __awaiter(this, void 0, void 0, function () {
        var response, movies, allMovies, _i, movies_2, movie, newDesc, title, url, requestData, response_2, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:4000/movies', {
                        method: 'GET'
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    movies = _a.sent();
                    allMovies = [];
                    for (_i = 0, movies_2 = movies; _i < movies_2.length; _i++) {
                        movie = movies_2[_i];
                        allMovies.push(movie.title);
                    }
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'title',
                                message: 'Which movie you want to update?',
                                choices: allMovies
                            },
                            {
                                type: 'input',
                                name: 'description',
                                message: 'Write description for a movie:'
                            }
                        ])];
                case 3:
                    newDesc = _a.sent();
                    return [4 /*yield*/, newDesc.title];
                case 4:
                    title = _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 8, , 9]);
                    url = "http://localhost:4000/movies/".concat(title, "/updatedesc");
                    console.log(url);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newDesc),
                        })];
                case 6:
                    requestData = _a.sent();
                    return [4 /*yield*/, requestData.json()];
                case 7:
                    response_2 = _a.sent();
                    if (requestData.status === 200 && response_2.length !== 0) {
                        console.log("\u2705 Movie description added to " + title);
                        return [2 /*return*/, response_2];
                    }
                    else {
                        console.error("\u274C Movie description isn't added, something went wrong.");
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 9];
                case 8:
                    error_7 = _a.sent();
                    console.error('An error occurred:', error_7.message);
                    return [2 /*return*/, null];
                case 9: return [2 /*return*/];
            }
        });
    });
}
//Delete movies
function deleteMovie() {
    return __awaiter(this, void 0, void 0, function () {
        var response, movies, allMovies, _i, movies_3, movie, deleteMovie, title, url, requestData, response_3, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:4000/movies', {
                        method: 'GET'
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    movies = _a.sent();
                    allMovies = [];
                    for (_i = 0, movies_3 = movies; _i < movies_3.length; _i++) {
                        movie = movies_3[_i];
                        allMovies.push(movie.title);
                    }
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'title',
                                message: 'Which movie you want to delete?',
                                choices: allMovies
                            }
                        ])];
                case 3:
                    deleteMovie = _a.sent();
                    return [4 /*yield*/, deleteMovie.title];
                case 4:
                    title = _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 8, , 9]);
                    url = "http://localhost:4000/movies/".concat(title, "/delete");
                    console.log(url);
                    return [4 /*yield*/, fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(deleteMovie),
                        })];
                case 6:
                    requestData = _a.sent();
                    return [4 /*yield*/, requestData.json()];
                case 7:
                    response_3 = _a.sent();
                    if (requestData.status === 200 && response_3.length !== 0) {
                        console.log("\u2705 Movie " + title + " deleted successfully!");
                        return [2 /*return*/, response_3];
                    }
                    else {
                        console.error("\u274C Movie isn't deleted, something went wrong.");
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 9];
                case 8:
                    error_8 = _a.sent();
                    console.error('An error occurred:', error_8.message);
                    return [2 /*return*/, null];
                case 9: return [2 /*return*/];
            }
        });
    });
}
//Interface -- Admin 
function displayAdminMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var adminChoices, adminAction, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\u2705 Welcome to the backstage of Online Movie Store!");
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 17];
                    adminChoices = ['Add a Movie', 'Update a Movie Information', 'Delete a Movie', 'Update a User details', 'Delete a User', 'Update Password', 'Logout'];
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'adminAction',
                                message: 'What would you like to do?',
                                choices: adminChoices,
                            }
                        ])];
                case 2:
                    adminAction = (_b.sent()).adminAction;
                    _a = adminAction;
                    switch (_a) {
                        case 'Add a Movie': return [3 /*break*/, 3];
                        case 'Update a Movie Information': return [3 /*break*/, 5];
                        case 'Delete a Movie': return [3 /*break*/, 7];
                        case 'Update a User details': return [3 /*break*/, 9];
                        case 'Delete a User': return [3 /*break*/, 11];
                        case 'Update Password': return [3 /*break*/, 13];
                        case 'Logout': return [3 /*break*/, 15];
                    }
                    return [3 /*break*/, 16];
                case 3: return [4 /*yield*/, addMovie()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 5: return [4 /*yield*/, updateMovie()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 7: return [4 /*yield*/, deleteMovie()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 9: return [4 /*yield*/, updateUser()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 11: return [4 /*yield*/, deleteUser()];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 13: return [4 /*yield*/, updatePassword()];
                case 14:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 15:
                    console.log('Logout successful!');
                    return [2 /*return*/];
                case 16: return [3 /*break*/, 1];
                case 17: return [2 /*return*/];
            }
        });
    });
}
//Interface -- User 
function displayUserMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var choices, action, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\u2705 Welcome to the Online Movie Store!");
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 11];
                    choices = ['Browse Movies', 'Search Movies', 'Update Password', 'Logout'];
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'action',
                                message: 'What would you like to do?',
                                choices: choices
                            },
                        ])];
                case 2:
                    action = (_b.sent()).action;
                    _a = action;
                    switch (_a) {
                        case 'Browse Movies': return [3 /*break*/, 3];
                        case 'Search Movies': return [3 /*break*/, 5];
                        case 'Update Password': return [3 /*break*/, 7];
                        case 'Logout': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 10];
                case 3: return [4 /*yield*/, BrowseMovies()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 5: return [4 /*yield*/, searchMovies()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 7: return [4 /*yield*/, updatePassword()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    console.log('Logout successful!'); // Provide feedback to the user
                    return [2 /*return*/]; // Exit the function, effectively ending the movie options
                case 10: return [3 /*break*/, 1];
                case 11: return [2 /*return*/];
            }
        });
    });
}
//Main Menu
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var user, loginOrSignup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = null;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 14];
                    if (!!user) return [3 /*break*/, 8];
                    console.log('Please log in or sign up:');
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'choice',
                                message: 'Choose an option:',
                                choices: ['Login', 'Signup', 'Exit'],
                            },
                        ])];
                case 2:
                    loginOrSignup = _a.sent();
                    if (!(loginOrSignup.choice === 'Login')) return [3 /*break*/, 4];
                    return [4 /*yield*/, login()];
                case 3:
                    user = _a.sent();
                    return [3 /*break*/, 7];
                case 4:
                    if (!(loginOrSignup.choice === 'Signup')) return [3 /*break*/, 6];
                    return [4 /*yield*/, signup()];
                case 5:
                    user = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    if (loginOrSignup.choice === 'Exit') {
                        console.log('Goodbye!');
                        process.exit(0);
                    }
                    _a.label = 7;
                case 7: return [3 /*break*/, 13];
                case 8:
                    if (!(user.role === "admin")) return [3 /*break*/, 10];
                    return [4 /*yield*/, displayAdminMenu()];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, displayUserMenu()];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    user = null;
                    _a.label = 13;
                case 13: return [3 /*break*/, 1];
                case 14: return [2 /*return*/];
            }
        });
    });
}
main();
