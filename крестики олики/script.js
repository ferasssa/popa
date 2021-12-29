let ceil = document.querySelectorAll(".game-item"),
  reset = document.querySelector("#reset-game"),
  message = document.querySelector("#message"),

  player = "1",

  stepCount = 0,

  winCombinations = [
      [1, 2, 3],
      [1, 4, 7],
      [1, 5, 9],
      [2, 5, 8],
      [3, 6, 9],
      [3, 5, 7],
      [4, 5, 6],
      [7, 8, 9],
  ],

  data1 = [],
  data0 = [];

  function currentStep() {
    let num = +this.getAttribute("data-ceil");
    if (!this.textContent) {
      this.innerText = player;
      player === "1"
        ? data1.push(num) && this.classList.add("1")
        : data0.push(num) && this.classList.add("0");
      if (
        (data0.length > 2 || data1.length > 2) &&
        ( checkWin (data0, num) || checkWin(data1, num) )
      )
      {
        for (let i = 0; i < ceil.length; i++) {
            ceil[i].removeEventListener("click", currentStep);
        }
        return (message.innerText = "Победил игрок " + player);
      }
      changePlayer();
      stepCount++;
      stepCount === 9
        ? (message.innerText = "Ничья")
        : (message.innerText = "Ходит игрок " + player);
    }
}
for (let i = 0; i < ceil.length; i++) {
    ceil[i].addEventListener("click", currentStep);
  }
function changePlayer() {
    player === "1" ? (player = "0") : (player = "1");
}
reset.addEventListener("click", function () {
  for (let i = 0; i < ceil.length; i++) {
    ceil[i].innerText = "";
  }
  data0 = [];
  data1 = [];
  player = "O";
  stepCount = 0;
  message.innerText = "Ходит игрок " + player;
  for (let i = 0; i < ceil.length; i++) {
    ceil[i].addEventListener("click", currentStep);
    ceil[i].classList.remove("1", "0");
  }
});
function checkWin(arr, number) {
  for (let w = 0, wLen = winCombinations.length; w < wLen; w++) {
    let someWenArr = winCombinations [w],
      count = 0;
    if (someWenArr.indexOf(number) !== -1) {
      for (let k = 0, kLen = someWenArr.length; k < kLen; k++) {
        if (arr.indexOf(someWenArr[k]) !== -1) {
          count++;
          if (count === 3) {
            return true;
          }
        }
      }
      count = 0;
    }
}}