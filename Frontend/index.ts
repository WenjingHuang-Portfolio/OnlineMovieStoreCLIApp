const inquirer = require('inquirer')

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
async function signup() {
	const newUser = await inquirer.prompt([
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
	])
	try {
		const url = 'http://localhost:4000/signup'

		const requestData = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		})

		const response = await requestData.json()
		if (requestData.status === 200 && response.length !== 0) {
			console.log(`✅ Account created successfully!`)
			return response.user
		} else {
			console.error(`❌ Account failed to be created, something went wrong.`)
			return null
		}


	} catch (error: any) {
		console.error('An error occurred:', error.message)
		return null
	}
}

//User Login
let currentUserID: string | null = null; //globally store the current logged-in user's ID
async function login() {
	const credentials = await inquirer.prompt([
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
	])

	try {
		const requestData = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
		};

		const response = await fetch('http://localhost:4000/login', requestData);
		const responseData = await response.json();

		if (response.ok && responseData.success) {
			currentUserID = responseData.user.id
			console.log(`✅ Welcome, ${responseData.user.firstName}!`);
			console.log(currentUserID)
			return responseData.user; // Return user object
		} else {
			console.error('❌ Login failed:', responseData.message || 'Invalid username or password. Please try again.');
			return null;
		}

	} catch (error: any) {
		console.error('An error occurred:', error.message)
		return null
	}
}

// |
// | User's authorities below: 
// V

//Browsing the list of all movies, and view details of a selected movie data
async function BrowseMovies() {

	try {
		const response = await fetch('http://localhost:4000/movies', {
			method: 'GET'
		})

		const movies: Movie[] = await response.json()
		console.log(movies)
		let allMovies = []
		for (let movie of movies) {
			allMovies.push(movie.title)
		}
		const selectedMovieTitle = await inquirer.prompt([
			{
				type: 'list',
				name: 'title',
				message: 'What movie do you want to watch?',
				choices: allMovies
			},
		])

		//Show details of the selected movie

		const title = await selectedMovieTitle.title     //Let ${title} know this title is the selected title

		const url = `http://localhost:4000/movies/${title}`

		console.log(title)
		console.log(url)     //Print title and url correctly

		const movieDetail = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(selectedMovieTitle),
		})

		const movie = await movieDetail.json()
		if (movieDetail.status === 200 && movie.length !== 0) {
			console.log(movie)
			return movieDetail
		} else {
			console.error('Invalid title. Please try again.')
			return null
		}

	}
	catch (error: any) {
		console.error('An error occurred:', error.message)
	}


}
//search for movies by matching similar input words, and show their details
async function searchMovies() {
	const movieInfo = await inquirer.prompt([
		{
			type: 'input',
			name: 'title',
			message: 'Enter Movie Name',
		},
	])
	const title = await movieInfo.title
	try {
		const url = `http://localhost:4000/movies/${title}`
		console.log(url)

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(movieInfo),
		})


		const movie = await response.json()
		if (response.status === 200 && movie.length !== 0) {
			console.log(movie)
			return response
		} else {
			console.error(`❌ No movie found. Please try again.`)
			return null
		}


	} catch (error: any) {
		console.error('An error occurred:', error.message)
	}
}


//Update user's password -- either user or admin can (only) do it for themselves
async function updatePassword() {
	console.log(currentUserID)
	const updatePassword = await inquirer.prompt([
		{
			type: 'input',
			name: 'password',
			message: 'Enter your new password:'
		}
	])
	try {
		const requestUpdatePassword = await fetch(`http://localhost:4000/users/${currentUserID}/updatepassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatePassword),
		})
		const responseUpdatePassword = await requestUpdatePassword.json()
		if (requestUpdatePassword.status === 200 && responseUpdatePassword.length !== 0) {
			console.log(`✅ User ID ` + currentUserID + ` password updated successfully`)
			return responseUpdatePassword
		} else {
			console.error(`❌ User's password failed to be updated, something went wrong.`)
			return null
		}
	}
	catch (err) {
		console.error('An error occurred:', err.message)
		return null
	}

}

// |
// | Admin's authorities below: 
// V


//Update User Details -- containing firstName and lastName -- only for admin
async function updateUser() {
	const getUser = await inquirer.prompt([
		{
			type: 'input',
			name: 'userID',
			message: 'Enter User ID',
		},

	])
	const id = await getUser.userID

	try {

		const url = `http://localhost:4000/users/${id}`

		const requestData = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(getUser),
		})

		const response = await requestData.json()
		console.log(response)


		const updateChoices = ['First Name', 'Last Name']

		const updateUser = await inquirer.prompt([
			{
				type: 'list',
				name: 'property',
				message: 'Which property do you want to update?',
				choices: updateChoices
			}
		])
		console.log(`You are updating User ` + id + updateUser.property)

		if (updateUser.property === 'First Name') {
			const updateFirstName = await inquirer.prompt([
				{
					type: 'input',
					name: 'firstName',
					message: 'Enter your new first name:'
				}
			])

			const requestUpdateFirstName = await fetch(`http://localhost:4000/users/${id}/updatefirstname`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateFirstName),
			})
			const responseUpdateFirstName = await requestUpdateFirstName.json()
			if (requestUpdateFirstName.status === 200 && responseUpdateFirstName.length !== 0) {
				console.log(`✅ User ID ` + id + ` firstname updated successfully`)
				return responseUpdateFirstName
			} else {
				console.error(`❌ User's detail failed to be updated, something went wrong.`)
				return null
			}

		}

		else {
			const updateLastName = await inquirer.prompt([
				{
					type: 'input',
					name: 'lastName',
					message: 'Enter your new last name:'
				}
			])
			const requestUpdateLastName = await fetch(`http://localhost:4000/users/${id}/updatelastname`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateLastName),
			})
			const responseUpdateLastName = await requestUpdateLastName.json()
			if (requestUpdateLastName.status === 200 && responseUpdateLastName.length !== 0) {
				console.log(`✅ User ID ` + id + ` last name updated successfully`)
				return responseUpdateLastName
			} else {
				console.error(`❌ User's detail failed to be updated, something went wrong.`)
				return null
			}

		}


	}
	catch (err: any) {
		console.error('An error occurred:', err.message)
		return null
	}
}

//Delete a user -- admin
async function deleteUser() {
	const response = await fetch('http://localhost:4000/users', {
		method: 'GET'
	})

	const users: User[] = await response.json()
	let allUsers = []
	for (let user of users) {
		allUsers.push(user.userID)
	}
	const deleteUser = await inquirer.prompt([
		{
			type: 'list',
			name: 'userID',
			message: 'Which user you want to delete?',
			choices: allUsers
		}
	])

	const id = await deleteUser.userID

	try {
		const url = `http://localhost:4000/users/${id}/delete`
		console.log(url)

		const requestData = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(deleteUser),
		})

		const response = await requestData.json()
		if (requestData.status === 200 && response.length !== 0) {
			console.log(`✅ User ` + id + ` deleted successfully!`)
			return response
		} else {
			console.error(`❌ The User isn't deleted, something went wrong.`)
			return null
		}

	} catch (error: any) {
		console.error('An error occurred:', error.message)
		return null
	}
}


//add a new movie (Add) -- Admin
async function addMovie() {
	const newMovie = await inquirer.prompt([
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
	])
	newMovie.genre = newMovie.genre.join(', ');

	try {
		const url = 'http://localhost:4000/movies'

		const requestData = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newMovie),
		})

		const response = await requestData.json()
		if (requestData.status === 200 && response.length !== 0) {
			console.log(`✅ ` + newMovie.title + ' added successfully!')
			return response
		} else {
			console.error(`❌ Movie isn't added, something went wrong.`)
			return null
		}

	} catch (error: any) {
		console.error('An error occurred:', error.message)
		return null
	}
}

//update movie info (Update)
async function updateMovie() {

	const response = await fetch('http://localhost:4000/movies', {
		method: 'GET'
	})

	const movies: Movie[] = await response.json()
	let allMovies = []
	for (let movie of movies) {
		allMovies.push(movie.title)
	}

	const newDesc = await inquirer.prompt([
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
	])
	const title = await newDesc.title

	try {
		const url = `http://localhost:4000/movies/${title}/updatedesc`
		console.log(url)

		const requestData = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newDesc),
		})

		const response = await requestData.json()
		if (requestData.status === 200 && response.length !== 0) {
			console.log(`✅ Movie description added to ` + title)
			return response
		} else {
			console.error(`❌ Movie description isn't added, something went wrong.`)
			return null
		}

	} catch (error: any) {
		console.error('An error occurred:', error.message)
		return null
	}
}

//Delete movies
async function deleteMovie() {
	const response = await fetch('http://localhost:4000/movies', {
		method: 'GET'
	})

	const movies: Movie[] = await response.json()
	let allMovies = []
	for (let movie of movies) {
		allMovies.push(movie.title)
	}

	const deleteMovie = await inquirer.prompt([
		{
			type: 'list',
			name: 'title',
			message: 'Which movie you want to delete?',
			choices: allMovies
		}
	])
	const title = await deleteMovie.title

	try {
		const url = `http://localhost:4000/movies/${title}/delete`
		console.log(url)

		const requestData = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(deleteMovie),
		})

		const response = await requestData.json()
		if (requestData.status === 200 && response.length !== 0) {
			console.log(`✅ Movie ` + title + ` deleted successfully!`)
			return response
		} else {
			console.error(`❌ Movie isn't deleted, something went wrong.`)
			return null
		}

	} catch (error: any) {
		console.error('An error occurred:', error.message)
		return null
	}
}


//Interface -- Admin 
async function displayAdminMenu() {
	console.log(`✅ Welcome to the backstage of Online Movie Store!`)

	while (true) {
		const adminChoices = ['Add a Movie', 'Update a Movie Information', 'Delete a Movie', 'Update a User details', 'Delete a User', 'Update Password', 'Logout']
		const { adminAction } = await inquirer.prompt([
			{
				type: 'list',
				name: 'adminAction',
				message: 'What would you like to do?',
				choices: adminChoices,
			}
		])
		switch (adminAction) {
			case 'Add a Movie':
				await addMovie()
				break
			case 'Update a Movie Information':
				await updateMovie()
				break
			case 'Delete a Movie':
				await deleteMovie()
				break
			case 'Update a User details':
				await updateUser()
				break
			case 'Delete a User':
				await deleteUser()
				break
			case 'Update Password':
				await updatePassword()
				break
			case 'Logout':
				console.log('Logout successful!')
				return
		}

	}
}

//Interface -- User 
async function displayUserMenu() {
	console.log(`✅ Welcome to the Online Movie Store!`)

	while (true) {
		// Infinite loop
		const choices = ['Browse Movies', 'Search Movies', 'Update Password', 'Logout']
		const { action } = await inquirer.prompt([
			{
				type: 'list',
				name: 'action',
				message: 'What would you like to do?',
				choices: choices
			},
		])

		switch (action) {
			case 'Browse Movies':
				await BrowseMovies()
				break
			case 'Search Movies':
				await searchMovies()
				break
			case 'Update Password':
				await updatePassword()
				break
			case 'Logout':
				console.log('Logout successful!') // Provide feedback to the user
				return // Exit the function, effectively ending the movie options
		}

	}
}

//Main Menu
async function main() {
	let user = null

	while (true) {
		if (!user) {
			console.log('Please log in or sign up:')
			const loginOrSignup = await inquirer.prompt([
				{
					type: 'list',
					name: 'choice',
					message: 'Choose an option:',
					choices: ['Login', 'Signup', 'Exit'],
				},
			])

			if (loginOrSignup.choice === 'Login') {
				user = await login()
			} else if (loginOrSignup.choice === 'Signup') {
				user = await signup()
			} else if (loginOrSignup.choice === 'Exit') {
				console.log('Goodbye!')
				process.exit(0)
			}
		} else {
			if (user.role === "admin") {
				await displayAdminMenu()

			} else {
				await displayUserMenu()

			}

			user = null
		}
	}
}

main()