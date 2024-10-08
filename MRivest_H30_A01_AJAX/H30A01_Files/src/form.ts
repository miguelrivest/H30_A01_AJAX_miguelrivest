/// <reference path="main.ts"/>

let form = document.querySelector("#player-form")! as HTMLFormElement
let fNameField = document.querySelector("#fname")! as HTMLInputElement
let lNameField = document.querySelector("#lname")! as HTMLInputElement
let usernameField = document.querySelector("#uname")! as HTMLInputElement
let emailField = document.querySelector("#email")! as HTMLInputElement
let gameDiv = document.querySelector("#game-list")! as HTMLElement
let fNameError = document.querySelector("#fNameError")! as HTMLParagraphElement
let lNameError = document.querySelector("#lNameError")! as HTMLParagraphElement
let emailError = document.querySelector("#emailError")! as HTMLParagraphElement
let gameError = document.querySelector("#gameError")! as HTMLParagraphElement
let usernameError = document.querySelector("#usernameError")! as HTMLParagraphElement
let winsField = document.querySelector("#wins")! as HTMLInputElement
let lossesField = document.querySelector("#losses")! as HTMLInputElement
let winsError = document.querySelector("#winsError")! as HTMLParagraphElement
let lossesError = document.querySelector("#lossesError")! as HTMLParagraphElement
let enrolledError = document.querySelector("#enrolledError")! as HTMLParagraphElement
let dateError = document.querySelector("#dateError")! as HTMLParagraphElement

// Regex pattern for email validation
let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

// Regex pattern for number validation
let numberPattern = /^\d+$/

// Event listener for form submission
form.onsubmit = (e) => handleFormSubmission(e)

// Event listener for first name field
fNameField.addEventListener('change', () => {
    if (lNameField.value !== "" && fNameField.value !== "") {
        usernameField.value = (fNameField.value.charAt(0) + lNameField.value).toLowerCase()
    } else {
        usernameField.value = ""
    }
})

// Event listener for last name field
lNameField.addEventListener('change', () => {
    if (fNameField.value !== "" && lNameField.value !== "") {
        usernameField.value = (fNameField.value.charAt(0) + lNameField.value).toLowerCase()
    } else {
        usernameField.value = ""
    }
})

// Function to validate the form
function validateForm(): Boolean {

    let isValid = true
    let checked = false
    let checkedBoxes: Array<HTMLInputElement> = []
    // Ensure at least one game is selected
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checked = true
            checkedBoxes.push(checkbox)
        }
    })

    if (!checked) {
        checkboxes.forEach((checkbox) => {
            let input = checkbox.parentElement as HTMLLabelElement
            let dateField = input.querySelector('input[type="date"]') as HTMLInputElement
            dateField.classList.remove("fieldError")
            dateError.classList.add("hide")
        })
    }

    // Validate all fields
    if (fNameField.value === "") {
        fNameError.classList.remove("hide")
        fNameField.classList.add("fieldError")
        isValid = false
    } else {
        fNameError.classList.add("hide")
        fNameField.classList.remove("fieldError")
    }

    // DATE VALIDATION
    if (enrolledDate.value === "" || new Date(enrolledDate.value) > new Date()) {
        enrolledError.classList.remove("hide")
        enrolledDate.classList.add("fieldError")
        isValid = false
    } else {
        enrolledError.classList.add("hide")
        enrolledDate.classList.remove("fieldError")
    }


    if (lNameField.value === "") {
        lNameError.classList.remove("hide")
        lNameField.classList.add("fieldError")
        isValid = false
    } else {
        lNameError.classList.add("hide")
        lNameField.classList.remove("fieldError")
    }


    if (emailField.value === "" || !emailPattern.test(emailField.value)) {
        emailError.classList.remove("hide")
        emailField.classList.add("fieldError")
        isValid = false
    } else {
        emailError.classList.add("hide")
        emailField.classList.remove("fieldError")
    }


    if (!checked) {
        gameError.classList.remove("hide")
        isValid = false
    } else {
        gameError.classList.add("hide")
    }

    checkedBoxes.forEach((checkbox) => {
        let input = checkbox.parentElement as HTMLLabelElement
        let dateField = input.querySelector('input[type="date"]') as HTMLInputElement
        if (dateField.value === "") {
            dateField.classList.add("fieldError")
            dateError.classList.remove("hide")
            isValid = false
        } else {
            dateField.classList.remove("fieldError")
            dateError.classList.add("hide")
        }
    })


    if (usernameField.value === "") {
        usernameError.classList.remove("hide")
        usernameField.classList.add("fieldError")
        isValid = false
    } else {
        usernameError.classList.add("hide")
        usernameField.classList.remove("fieldError")
    }


    if (!numberPattern.test(winsField.value) && winsField.value !== "") {
        winsError.classList.remove("hide")
        winsField.classList.add("fieldError")
        isValid = false
    } else {
        winsError.classList.add("hide")
        winsField.classList.remove("fieldError")
    }


    if (!numberPattern.test(lossesField.value) && lossesField.value !== "") {
        lossesError.classList.remove("hide")
        lossesField.classList.add("fieldError")
        isValid = false
    } else {
        lossesError.classList.add("hide")
        lossesField.classList.remove("fieldError")
    }

    return isValid
}

function resetForm() {

    // Remove Errors
    fNameError.classList.add("hide")
    lNameError.classList.add("hide")
    emailError.classList.add("hide")
    gameError.classList.add("hide")
    usernameError.classList.add("hide")
    winsError.classList.add("hide")
    lossesError.classList.add("hide")
    fNameField.classList.remove("fieldError")
    lNameField.classList.remove("fieldError")
    emailField.classList.remove("fieldError")
    gameDiv.classList.remove("fieldError")
    usernameField.classList.remove("fieldError")
    winsField.classList.remove("fieldError")
    lossesField.classList.remove("fieldError")
    enrolledDate.classList.remove("fieldError")
    enrolledError.classList.add("hide")

    // Reset all fields
    fNameField.value = ""
    lNameField.value = ""
    emailField.value = ""
    usernameField.value = ""
    winsField.value = ""
    lossesField.value = ""

    // Uncheck all checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false
    })
}

// Function to handle form submission
function handleFormSubmission(event: any) {
    event.preventDefault()
    if (validateForm()) {
        let enrolledDateValue = new Date(enrolledDate.value)
        enrolledDateValue.setUTCDate(enrolledDateValue.getUTCDate() + 1)

        // Text field values
        let firstName = fNameField.value
        let lastName = lNameField.value
        let email = emailField.value
        let username = usernameField.value

        // Date field value
        let dateFormat = enrolledDateValue.toISOString().split('T')[0]
        let splitDate = dateFormat.split('-')

        let year = splitDate[0]
        let month = splitDate[1]
        let day = (Number.parseInt(splitDate[2]) - 1).toString()

        let dateString = `${year}/${month}/${day}`

        // Number field values
        let wins = 0
        let losses = 0
        if (winsField.value !== "") {
            wins = parseInt(winsField.value)
        }
        if (lossesField.value !== "") {
            losses = parseInt(lossesField.value)
        }

        // Array of selected games
        let games: any = []
        checkboxes.forEach((checkbox) => {
            let input = checkbox.parentElement as HTMLLabelElement
            if (checkbox.checked) {
                games.push(input)
            }
        })

        let games_played: any = []
        games.forEach((game: any) => {
            let gameName = game.querySelector('input[type="checkbox"]')!.value
            let gameDate = game.querySelector('input[type="date"]')!.value
            let gameDateValue = new Date(gameDate)
            let gameDateSplit = gameDateValue.toISOString().split('T')[0].split('-')
            let gameYear = gameDateSplit[0]
            let gameMonth = gameDateSplit[1]
            let gameDay = gameDateSplit[2]
            let gameDateString = `${gameYear}/${gameMonth}/${gameDay}`
            let gameJSON = {
                game: gameName,
                date: gameDateString
            }
            games_played.push(gameJSON)
        })

        if (games_played.length === 1) {
            games_played = games_played[0]
        }

        let playerJSON = {
            id: playerArray.length + 1,
            first_name: firstName[0].toUpperCase() + firstName.slice(1).toLowerCase(),
            last_name: lastName[0].toUpperCase() + lastName.slice(1).toLowerCase(),
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            enrolled: dateString,
            avatar: `https://robohash.org/${username}.png?size=60x60&set=set5`,
            wins: wins,
            losses: losses,
            games_played: games_played
        }

        fetch('./php/addPlayer.php', {
            method: 'POST',
            body: JSON.stringify(playerJSON)
        }).then(response => {
            if (response.ok) {
                alert("Player added successfully!")
                window.location.reload()
            }
        }).catch(error => {
            alert("Error adding player")
            console.log(error)
        })
    }
}