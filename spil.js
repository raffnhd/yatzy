document.getElementById('roll-button').addEventListener('click', rollDice);

const dieImages = [
    'dice-six-faces-one.png',
    'dice-six-faces-two.png',
    'dice-six-faces-three.png',
    'dice-six-faces-four.png',
    'dice-six-faces-five.png',
    'dice-six-faces-six.png'
];

let currentRound = 1;
let rollsThisRound = 0;
const maxRounds = 15;
const maxRollsPerRound = 3;
const roundData = [];

function rollDice() {
    if (currentRound > maxRounds) {
        alert("Game over! You've completed all rounds.");
        return;
    }

    if (rollsThisRound >= maxRollsPerRound) {
        if (!checkIfAnyInputFilledThisRound()) {
            alert("You must fill in at least one score before proceeding to the next round.");
            return;
        } else {
            disableFilledInputs();
            currentRound++;
            rollsThisRound = 0;
            resetDice();
            updateRollsLeft();
            updateCurrentRound();
        }
    }

    const currentRollData = [];

    for (let i = 1; i <= 5; i++) {
        const die = document.getElementById(`die${i}`);
        if (!die.classList.contains('locked')) {
            const roll = Math.floor(Math.random() * 6) + 1;
            die.innerHTML = `<img src="${dieImages[roll - 1]}" alt="Die ${roll}">`;
            currentRollData.push({value: roll, locked: true});
        } else {
            const roll = parseInt(die.querySelector('img').alt.split(' ')[1]);
            currentRollData.push({value: roll, locked: false});
        }
    }

    if (!roundData[currentRound - 1]) {
        roundData[currentRound - 1] = [];
    }

    roundData[currentRound - 1].push(currentRollData);

    rollsThisRound++;
    updateRollsLeft();
}

function holdLock(event) {
    const die = event.currentTarget;
    die.classList.toggle('locked');
}

function resetDice() {
    for (let i = 1; i <= 5; i++) {
        const die = document.getElementById(`die${i}`);
        die.classList.remove('locked');
        die.innerHTML = '';
    }
}

function updateRollsLeft() {
    const rollsLeft = maxRollsPerRound - rollsThisRound;
    document.getElementById('rolls-left').textContent = `Rolls left: ${rollsLeft}`;
}

function updateCurrentRound() {
    document.getElementById('current-round').textContent = `Round: ${currentRound}`;
}

function disableFilledInputs() {
    const inputs = document.querySelectorAll('#scorecard input');
    inputs.forEach(input => {
        if (input.value !== '') {
            input.disabled = true;
            input.setAttribute('data-round-filled', currentRound);
        }
    });
}

function checkIfAnyInputFilledThisRound() {
    const inputs = document.querySelectorAll('#scorecard input');
    return Array.from(inputs).some(input => input.value !== '' && input.getAttribute('data-round-filled') == currentRound);
}

function labelClicked(id) {
    const input = document.getElementById(id).querySelector('input');
    input.focus();
}

for (let i = 1; i <= 5; i++) {
    document.getElementById(`die${i}`).addEventListener('click', holdLock);
}

// Initialize the rolls left display and current round display
updateRollsLeft();
updateCurrentRound();