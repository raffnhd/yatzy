document.getElementById('roll-button').addEventListener('click', rollDice);

let currentRound = 1;
let rollsThisRound = 0;
const maxRounds = 15;
const maxRollsPerRound = 3;
let dieValues = [];

function rollDice() {
    for (let i = 1; i <= 5; i++) {
        const die = document.getElementById(`die${i}`);
        if (!die.classList.contains('locked')) {
            const roll = Math.floor(Math.random() * 6) + 1;
            die.innerHTML = `<img src="${dieConverter(roll)}" alt="Die ${roll}">`;
            dieValues[i - 1] = roll;
        } else {
            const roll = parseInt(die.querySelector('img').alt.split(' ')[1]);
        }
    }
    console.log(dieValues);
}

function dieConverter(roll){
    switch (roll) {
        case 1:
            return 'dice-six-faces-one.png';
        case 2:
            return 'dice-six-faces-two.png';
        case 3:
            return 'dice-six-faces-three.png';
        case 4:
            return 'dice-six-faces-four.png';
        case 5:
            return 'dice-six-faces-five.png';
        case 6:
            return 'dice-six-faces-six.png';
    }
}

function getResults() {
    let total = new Array(15);
    for (let i = 0; i < 6; i++) {
        total[i] = yatzyHjerne.sameValuePoints(i + 1);
    }
    total[6] = yatzyHjerne.onePair();
    total[7] = yatzyHjerne.twoPairs();
    total[8] = yatzyHjerne.threeOfAKind();
    total[9] = yatzyHjerne.fourOfAKind();
    total[10] = yatzyHjerne.smallStraight();
    total[11] = yatzyHjerne.largeStraight();
    total[12] = yatzyHjerne.fullHouse();
    total[13] = yatzyHjerne.chance();
    total[14] = yatzyHjerne.yatzy();

    return total;
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