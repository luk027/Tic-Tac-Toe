    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector(".reset-btn");
    let newGameBtn = document.querySelector(".newgame-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector(".msg");

    let turnO = true;

    const winPatterns = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],
        [6,7,8],
    ];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if(turnO){
                box.innerText = "O";
                turnO = false;
            }else{
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        });
    });

    resetBtn.addEventListener("click", () => {
        resetgame();
    });
    newGameBtn.addEventListener("click", () => {
        resetgame();
    });

    const resetgame = () => {
        turnO = true;
        enabledBoxes();
        msgContainer.classList.add("hide"); 
        for(let box of boxes){
            box.style.backgroundColor = "#ebebd3";
        }
    }

    const disabledBoxes = () => {
        for(let box of boxes){
            box.disabled = true;
        }
    };

    const enabledBoxes = () => {
        for(let box of boxes){
            box.disabled = false;
            box.innerText = "";
        }
    };

    const showWinner = (winner) => {
        let quotes = [
        "Tension mat le beta, Apne baap se hara hai😏",
        "Jaa baap ko bula, Tere se nahi hoga",
        "Kuch to saram kr kitni baar harega🤡",
        "For winner 🍰, for looser 💩"];
        let randomQuote = Math.floor(Math.random()*quotes.length);
        msg.innerText = `${winner} : ${quotes[randomQuote]}`;
        msgContainer.classList.remove("hide");
    };

    const checkDraw = () => {
        let isDraw = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                isDraw = false;
                break;
            }
        }
        return isDraw;
    };

    const checkWinner = () => {
        let winnerFound = false;
        for(let pattern of winPatterns){
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if(pos1val != "" && pos2val != "" && pos3val != ""){
                if(pos1val === pos2val && pos2val === pos3val){
                    console.log("Winner", pos1val);
                    boxes[pattern[0]].style.backgroundColor = "#F4D35E";
                    boxes[pattern[1]].style.backgroundColor = "#F4D35E";
                    boxes[pattern[2]].style.backgroundColor = "#F4D35E";
                    showWinner(pos1val);
                    disabledBoxes();
                    winnerFound = true;
                    break;
                }
            }
        }
        if (!winnerFound && checkDraw()) {
            // If no winner is found and it's a draw
            let quotes = [
                "🫵Tum Dono ki....",
                "Us Bhai Us🤝"];
            let randomQuote = Math.floor(Math.random()*quotes.length);
            msg.innerText = `${quotes[randomQuote]}`;
            msgContainer.classList.remove("hide");
        }
    };
    