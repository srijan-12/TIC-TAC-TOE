let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let nGame = document.querySelector("#ngame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");  //access p tag with id msg
let turnO = true;



//win Pattern array
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//reset game
const resetGame = () =>{
    turnO = true;
    enableBtns();
    msgContainer.classList.add("hide");
}





//making the boxes functional and disabling them after single click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
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






//Disabling buttons after winner is decleared
const disableBtns = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

//Enable buttons for new or reset game
const enableBtns = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}


// function for printing the winner
const showWinner = (winner) =>{
    msg.innerText =`Congratulation, Winner is ${winner}`;   //in p tag this will gets printed
    msgContainer.classList.remove("hide");                  //here we are removing the hide class functionality ho that container gets visible and button gets active
    disableBtns();                                          //calling disableBtns function 
}



//draw game
const drawGame = () => {
    msgContainer.classList.remove("hide");   
    msg.innerText = `Oops! Tough Competation. Press reset button or start new game`;
}




const checkWinner = () => {
    let winnerFound = false;
    for(let pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);    //pattern array ke individual pos p jaa k uska value print kiye
        // console.log(boxes[pattern[0]].innerText, // wo pos value ko as a index use kr k box ko identify kiye or phir uska inner text ko
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        //     );
        

            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if(pos1Val != ""&& pos2Val != "" && pos3Val != ""){
                if(pos1Val == pos2Val && pos2Val == pos3Val){
                    console.log("winner",pos1Val);
                    showWinner(pos1Val);
                    winnerFound = true;
                    break;
                }
            }
    }
    if (!winnerFound) {
        // Check if all boxes are filled
        let allFilled = Array.from(boxes).every((box) => box.innerText !== "");
        if (allFilled) {
            drawGame();
        }
    }


}


nGame.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
