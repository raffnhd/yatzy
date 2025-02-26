document.getElementById('roll-button').addEventListener('click', rollDice);
const scoreLabels = document.querySelectorAll('.score-input');
for (let button of scoreLabels) {
    button.addEventListener('click', inputClicked);
}


let currentRound = 1;
let rollsThisRound = 0;
const maxRounds = 15;
const maxRollsPerRound = 3;
let dieValues = [];
let score;
let finalScore = [];

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
    console.log(frequency(dieValues));
    console.log(getResults(dieValues));
    let scoreinput = document.getElementsByClassName('score-input');
    score = getResults(dieValues);
    for (let e in scoreinput) {
        scoreinput[e].innerHTML = `<button value="">${score[e]}</button>`;
    }
    let suminput = document.getElementById('sum');
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        sum += score[i];
        }
    suminput.innerHTML = `<button value="">${sum}</button>`;
}

function inputClicked(event) {
    const input = event.currentTarget;
    let scoreinput = document.getElementsByClassName('score-input');
    for (let e in scoreinput) {
        if (scoreinput[e] == input) {
            finalScore[e] = score[e];
            break;
        }
    }
    console.log(finalScore);
    input.innerHTML =`<button value="" style="diplay = block">${finalScore[e]}</button>`

 
    console.log("object");
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

function getResults(dieValues) {
    frequency(dieValues);
    let total = new Array(15);
    for (let i = 0; i < 6; i++) {
        total[i] = sameValuePoints(i + 1);
    }

    total[6] = onePair();
    total[7] = twoPairs();
    total[8] = threeOfAKind();
    total[9] = fourOfAKind();
    total[10] = smallStraight();
    total[11] = largeStraight();
    total[12] = fullHouse();
    total[13] = chance(dieValues);
    total[14] = yatzy();

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

for (let i = 1; i <= 5; i++) {
    document.getElementById(`die${i}`).addEventListener('click', holdLock);
}

// Initialize the rolls left display and current round display
updateRollsLeft();
updateCurrentRound();

let freq = new Array(6).fill(0);

    function frequency(dieValues) {
        /*dieValues.forEach(die => freq [die - 1]++);
        return freq;*/
        for (let i = 0; i < dieValues.length; i++) {
            if (dieValues[i] == 1) {
                freq[0]++;
            } else if (dieValues[i] == 2) {
                freq[1]++;
            } else if (dieValues[i] == 3) {
                freq[2]++;
            } else if (dieValues[i] == 4) {
                freq[3]++;
            } else if (dieValues[i] == 5) {
                freq[4]++;
            } else if (dieValues[i] == 6) {
                freq[5]++;
            }
        }
    }
    
    
    function sameValuePoints(value) {
        let sum = 0;
        for (let i of dieValues) {
            if (i == value) {
                sum += i;
            }
        }
        return sum;
    }

    function onePair() {
        for (let i = freq.length; i >= 1; i--) {
            if (freq[i - 1] >= 2) {
                return i * 2;
            }
        }
        return 0;
    }

    function twoPairs() {
        let sum = 0;
        let pairs = 0;
        for (let i = freq.length; i >= 1; i--) {
            if (freq[i - 1] >= 2) {
                sum += i * 2;
                pairs++;
            }
        }
        return pairs == 2 ? sum : 0;
    }

    function threeOfAKind() {
        for (let i = freq.length; i >= 1; i--) {
            if (freq[i - 1] >= 3) {
                return i * 3;
            }
        }
        return 0;
    }

    function fourOfAKind() {
        for (let i = freq.length; i >= 1; i--) {
            if (freq[i - 1] >= 4) {
                return i * 4;
            }
        }
        return 0;
    }

    function smallStraight() {
        let smallStraight = 15;
        for (let i = 0; i <= 4; i++) {
            if (freq[i] !== 1) {
                smallStraight = 0;
            }
        }
        return smallStraight;
    }

    function largeStraight() {
        let largeStraight = 20;
        for (let i = 1; i <= 5; i++) {
            if (freq[i] !== 1) {
                largeStraight = 0;
            }
        }
        return largeStraight;
    }

    function fullHouse() {
        let three = false;
        let two = false;
        for (let i = freq.length; i >= 1; i--) {
            if (freq[i - 1] == 3) {
                three = true;
            } else if (freq[i - 1] == 2) {
                two = true;
            }
        }
        return three && two ? this.chance() : 0;
    }

    function chance(dieValues) {
        let sum = 0;
        for (let i of dieValues) {
            sum += i;
        }
        return sum;
    }

    function yatzy() {
        for (let i = freq.length; i >= 1; i--) {
            if (freq[i - 1] == 5) {
                return 50;
            }
        }
        return 0;
    }
