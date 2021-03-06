let one = document.querySelector(".one")
let two = document.querySelector(".two")
let three = document.querySelector(".three")
let four = document.querySelector(".four")
let five = document.querySelector(".five")
let six = document.querySelector(".six")
let seven = document.querySelector(".seven")
let eight = document.querySelector(".eight")
let nine = document.querySelector(".nine")
let lowertext = document.querySelector(".belowtext")
let lowertexttwo = document.querySelector(".belowtext")
let namesbutton = document.querySelector(".namesbutton")
let nameoneinput = document.querySelector(".nameone")
let nametwoinput = document.querySelector(".nametwo")
let inputs = document.querySelector(".inputs")
let nameone = ""
let nametwo = ""
let restartButton = document.querySelector(".restart")
let random = 0;
let aimovebutton = document.querySelector(".aimovebutton")

let gameboard = {
    gbArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    gbCells: [one, two, three, four, five, six, seven, eight, nine],
    gbStatus: ["false", "false", "false", "false", "false", "false", "false", "false", "false"],
    turnCount: 0,
    gameStatus: -1
}

let displayFlow = {
    prevTurn: "",
    nextTurn: "X"
}


// winning combos for grid
let winningCombos = [
    "012",
    "345",
    "678",
    "036",
    "147",
    "258",
    "048",
    "246"
]


// on click, register go. also check winner

gameboard.gbCells.forEach((item, index, array) => {
    gameboard.gbCells[index].addEventListener("click", function () {
        if (gameboard.gameStatus == 0) {
            if (gameboard.gbStatus[index] == "false") {
                gameboard.gbCells[index].textContent = displayFlow.nextTurn
                gameboard.gbStatus[index] = "true"
                if (displayFlow.nextTurn == "O") {
                    displayFlow.nextTurn = "X"
                } else if (displayFlow.nextTurn == "X") {
                    displayFlow.nextTurn = "O"
                } else
                    (console.log("error 352"))
                gameboard.turnCount = gameboard.turnCount + 1;
            } else if (gameboard.gbStatus[index] == "true") {
                console.log("taken")
            } else
                (console.log("error 239"))
            checkWinner()
        }
    })
})

// check for three in a row or a tie

function checkWinner() {
    if (gameboard.gameStatus == 0) {
        winningCombos.forEach((item, index, array) => {
            let comboArray = String(item).split('');
            if ((gameboard.gbStatus[comboArray[0]] == "true") && (gameboard.gbStatus[comboArray[1]] == "true") && (gameboard.gbStatus[comboArray[2]] == "true")) {

                let w1 = gameboard.gbCells[comboArray[0]].textContent; //g
                let w2 = gameboard.gbCells[comboArray[1]].textContent; //h
                let w3 = gameboard.gbCells[comboArray[2]].textContent; //f

                if (w1 === w2 && w1 === w3 && w1 !== null) {
                    console.log("we have a winner!")
                    gameboard.gbCells[comboArray[0]].style.color = "#A58CA5"
                    gameboard.gbCells[comboArray[1]].style.color = "#A58CA5"
                    gameboard.gbCells[comboArray[2]].style.color = "#A58CA5"
                    if (w1 == "X") {
                        lowertext.textContent = nameone + ", you win! To play again, please refresh.";
                        endgameButtons()
                        gameboard.gameStatus = 1;
                    } else if (w1 == "O") {
                        lowertext.textContent = nametwo + ", you win! To play again, please refresh.";
                        endgameButtons()
                        gameboard.gameStatus = 1;
                    } else {
                        console.log("error 538")
                    }
                    restartButton.classList.toggle("hide")
                }

            }
            if (gameboard.turnCount == 9) {
                endGame()
            }
        })
    }
}



// end game
function endGame() {
    if (gameboard.gameStatus == 0) {
        console.log("its a tie")
        lowertext.textContent = "It's a tie! Refresh to play again."
        endgameButtons()
    }
}


inputs.classList.toggle("hidetwo")
// names
namesbutton.addEventListener("click", function () {
    nameone = nameoneinput.value;
    nametwo = nametwoinput.value;
    if (nameone !== "" && nametwo !== "") {
        inputs.classList.toggle("hidetwo")
        lowertext.textContent = `Welcome ${nameone} and ${nametwo}. ${nameone}, please use X. ${nametwo}, please use O. `
        gameboard.gameStatus = 0;
        aimovebutton.classList.toggle("hide")
    } else if (nameone == "" || nametwo == "") {
        alert("Please enter your name x")
    } else {
        console.log("eror 481")
    }
})

//restart button
restartButton.addEventListener("click", function () {
    location.reload()
})

function aimove() {
    random = Math.floor(Math.random() * 9)
    console.log(random)
    if (gameboard.gameStatus == 0) {
        if (gameboard.gbStatus[random] == "false") {
            gameboard.gbCells[random].textContent = displayFlow.nextTurn
            gameboard.gbStatus[random] = "true"
            if (displayFlow.nextTurn == "O") {
                displayFlow.nextTurn = "X"
            } else if (displayFlow.nextTurn == "X") {
                displayFlow.nextTurn = "O"
            } else
                (console.log("error 352"))
            gameboard.turnCount = gameboard.turnCount + 1;
        } else if (gameboard.gbStatus[random] == "true") {
            console.log("taken")
            aimove()
        } else {
            console.log("error 239")
        }
        checkWinner()
    }
}

aimovebutton.addEventListener("click", function () {
    aimove()
})

function endgameButtons(){
    aimovebutton.classList.add("hidetwo")
    restartButton.classList.add("show")
}