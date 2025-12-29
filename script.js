let boxes = [...document.querySelectorAll('.box')];
let resetBtn = document.querySelector('#reset');
let turnO = true; // Player O starts
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (turnO) {
            box.innerText = 'O';
            box.style.color = 'green';
            turnO = false;
            box.disabled = true;
            checkWinner();
        } else {
            box.innerText = 'X';
            box.style.color = 'black';
            turnO = true;
            box.disabled = true;
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = "🎉 Congratulations, Winner is" + winner + "🎉";
    msgContainer.classList.remove('hide');
    disableBoxes();
    fireWorks();
    setTimeout(fireWorks, 400);
    setTimeout(fireWorks, 800);
};

const checkWinner = () => {
    let hasWin = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val!=="" && pos3Val!=="" 
            && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            hasWin = true;
            return;
        }
    }

    if (!hasWin) {
        const allBoxes = [...boxes].every((box) => box.innerText !== "");
        if (allBoxes) {
            msgContainer.classList.remove('hide');
            msg.innerText = 'Match Drawn';
        }
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

const fireWorks = () => {
    const colors = ["#ff7675", "#fdcb6e", "#00cec9", "#74b9ff", "#a29bfe"];

    for (let i = 0; i < 40; i++) {
        const spark = document.createElement("div");
        spark.classList.add("firework");

        const size = Math.random() * 6 + 4;
        spark.style.width = size + "px";
        spark.style.height = size + "px";
        spark.style.background = colors[Math.floor(Math.random() * colors.length)];

        spark.style.left = "50vw";
        spark.style.top = "70vh";

        const angle = Math.random() * 2 * Math.PI;
        const distance = 150 + Math.random() * 200;

        spark.style.setProperty("--x", Math.cos(angle) * distance + "px");
        spark.style.setProperty("--y", Math.sin(angle) * distance + "px");

        document.body.appendChild(spark);

        setTimeout(() => spark.remove(), 1200);
    }
};
