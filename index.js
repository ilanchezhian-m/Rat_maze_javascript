let level1 = [
    [1,0,1,0],
    [1,1,1,1],
    [1,0,1,0],
    [0,1,1,1],
];

let level2 = [
    [1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1],
];
let level3 = [
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 1],
];

//  0 is wall , 1 is space , 2 is rat .
let mazearray = level1;
let level = document.getElementById("levelselect");
level.addEventListener("change",() => {
    let Level = level.value;
    if(Level ==1){
        mazearray = level1;
    }
    if(Level == 2){
        mazearray = level2;
    }
    if(Level == 3){
        mazearray = level3;
    }
   
    maze.innerHTML =`<img src="rat.png" id="rat" alt="rat" width="50px" height="50px">
    <img src="food.png" id="food" alt="cheese" width="50px" height="50px">`
    createMaze();
    
});



let maze = document.getElementById("maze-container");
let rat = document.getElementById("rat");
let food = document.getElementById("food");

function setratposition(x, y) {
    rat.style.top = x + "px";
    rat.style.left = y + "px";
}
function setfoodposition(x, y) {
    food.style.bottom = x + "px";
    food.style.right = y + "px";
}

createMaze();

function createMaze(){
    for(let i =0 ;i < mazearray.length;i++){
        let row = document.createElement("div");
        row.classList.add("row");

    for(let j = 0 ; j<mazearray[i].length;j++){
        let cell = document.createElement("div");
        cell.classList.add("cell");

             if(mazearray[i][j] == 0){
                cell.classList.add("wall");
            }
            row.appendChild(cell);
            // rat = 2 , replace 2 with 0,0 of mazearray ---------------------------------
            if (i == 0 && j == 0) {
                mazearray[i][j] = 2;
            }

        }
        maze.appendChild(row);
    } 

    setratposition(0, 0)
    setfoodposition(0, 0)
}

function getratposition(){
    let position = [-1,-1];
    for(let i =0 ;i < mazearray.length;i++){
       
          for(let j = 0 ; j<mazearray[i].length;j++){
            if(mazearray[i][j] == 2){
            position[0] = i ;// 0 th Row
            position[1] = j ;
            }
         }
     }
     return position;
 }
document.addEventListener("keydown",
function (e) {
    let rat = document.getElementById("rat");
    let food = document.getElementById("food");
    let ratleft = rat.offsetLeft;
    let rattop = rat.offsetTop;
    let foodtop = food.offsetTop;
    let foodleft = food.offsetLeft;
    let ratposition = getratposition();

        // console.log(ratleft, rattop);
        if (e.key == "ArrowRight" && ratleft < (mazearray.length - 1) * 50 && mazearray[ratposition[0]][ratposition[1] + 1] == 1) {
            ratleft += 50;
            rat.style.left = ratleft + "px";
            mazearray[ratposition[0]][ratposition[1]] = 1;
            mazearray[ratposition[0]][ratposition[1] + 1] = 2;
        }


        if (e.key == "ArrowLeft" && ratleft > 0 && mazearray[ratposition[0]][ratposition[1] - 1] == 1) {
            ratleft -= 50;
            rat.style.left = ratleft + "px";
            mazearray[ratposition[0]][ratposition[1]] = 1;
            mazearray[ratposition[0]][ratposition[1] - 1] = 2;
        }

        if (e.key == "ArrowUp" && rattop > 0 && mazearray[ratposition[0] - 1][ratposition[1]] == 1) {
            rattop -= 50;
            rat.style.top = rattop + "px";
            mazearray[ratposition[0]][ratposition[1]] = 1;
            mazearray[ratposition[0] - 1][ratposition[1]] = 2;
        }


        if (e.key == "ArrowDown" && rattop < (mazearray.length - 1) * 50 && mazearray[ratposition[0] + 1][ratposition[1]] == 1) {
            rattop += 50;
            rat.style.top = rattop + "px";
            mazearray[ratposition[0]][ratposition[1]] = 1;
            mazearray[ratposition[0] + 1][ratposition[1]] = 2;
        }
        e.preventDefault();

        if (ratleft == foodleft && rattop == foodtop) {
            alert("You Won");
        }
})

