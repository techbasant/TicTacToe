let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container")
let newGameBtn = document.querySelector("#new-btn");

let turnO = true; //playerX, playerO
let count = 0;

let winningPatterens = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box is clicked");
        if(turnO){
            box.innerText = "O";
            box.classList.add("box");
            box.classList.remove("boxx")
            turnO = false;
        }else{
            box.innerText = "X";
            box.classList.add("boxx");
            box.classList.remove("box")
            turnO = true;
        }
        box.disabled = true;
        count++;
        
        let isWinner = checkWinner();

        if(count == 9 && !isWinner ){
            gameDraw();
        }
    })
})

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showWinner = (winner) =>{
    console.log(winner);
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
} 

const checkWinner = () => {
    for(pattern of winningPatterens){
        //console.log(pattern[0],pattern[1],pattern[2]);
        //console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;
        if(posVal1 != "" && posVal2 != "" && posVal3 != ""){
            if(posVal1 == posVal2 && posVal2 == posVal3){
                showWinner(posVal1);
                return true;
            }
        }

    }
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}



newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);