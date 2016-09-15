var canvas = document.getElementById("conway").getContext("2d");
var grid = [];

init();

function init() {
    canvas.rect(0,0,600,400);
    canvas.stroke();
    for(var i = 0; i < 40; i++) {
        grid[i] = [];
        for(var j = 0; j < 60; j++) {
            grid[i][j] = 0;
        }
    }
    console.log(grid);
    <!-- Now fill in a glider gun -->
    // Prefilled cells
    [
        // Gosper glider gun
        [1, 5],[1, 6],[2, 5],[2, 6],[11, 5],[11, 6],[11, 7],[12, 4],[12, 8],[13, 3],[13, 9],[14, 3],[14, 9],[15, 6],[16, 4],[16, 8],[17, 5],[17, 6],[17, 7],[18, 6],[21, 3],[21, 4],[21, 5],[22, 3],[22, 4],[22, 5],[23, 2],[23, 6],[25, 1],[25, 2],[25, 6],[25, 7],[35, 3],[35, 4],[36, 3],[36, 4],
        //[39,59]
    ]
        .forEach(function(point) {
            grid[point[1]][point[0]] = 1;
        });
    draw();
    update();
}

function update() {
    var changeList = [];
    for(var i=0; i < 40; i++) {
        for(var j=0; j < 60; j++) {
            if(Boolean(grid[parseInt(i)][parseInt(j)]) != isCellOn(i, j)){
                changeList.push([i, j])
            }
        }
    }
    drawChanges(changeList);
    setTimeout(function(){ update(); }, 100);
}

function isCellOn(row, col) {
    num = numOnCells(row, col);
    currentState = grid[row][col];
    if(num < 2){
        return false;
    } else if(num==2) {
        return Boolean(currentState);
    } else if(num==3) {
        return true;
    }
    return false;
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function numOnCells(row, col) {
    var count = 0;
    indexes = [-1, 0, 1];
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            x_idx = parseInt(mod((col + indexes[j]), 60));
            y_idx = parseInt(mod((row + indexes[i]), 40));
            if(x_idx != col || y_idx != row) {
                if(grid[y_idx][x_idx]) {
                    count++;
                }
            }
        }
    }
    return count
}

function draw() {
    canvas.clearRect(0,0,600,400);
    for(var i=0; i < grid.length; i++){
        for(var j=0; j < grid[0].length; j++){
            cell = grid[i][j];
            if(cell) {
                canvas.beginPath();
                canvas.rect(10 * j, 10 * i, 10, 10);
                canvas.fill();
            }
        }
    }
}
function drawChanges(changeList) {
    for(var i=0; i < changeList.length; i++) {
        var currentVal = grid[changeList[i][0]][changeList[i][1]];
        x = changeList[i][0];
        y = changeList[i][1];
        if(!currentVal) {
            canvas.beginPath();
            canvas.rect(10 * y, 10 * x, 10, 10);
            colors = ["#ff7473", "#ffc952", "#47b8e0", "#34314c"];
            var color = colors[Math.floor(Math.random()*colors.length)];
            canvas.fillStyle = color;
            canvas.imageSmoothingEnabled = false;
            canvas.fill();
        } else {
            canvas.clearRect((10 * y), (10 * x), 10, 10);
        }
        grid[changeList[i][0]][changeList[i][1]] = !currentVal ? 1 : 0;
    }

}