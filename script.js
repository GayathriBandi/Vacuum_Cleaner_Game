const gridSize = 5;
let floor = [
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1]
]; 

let vacuumPosition = { row: 0, col: 0 };

const grid = document.getElementById('grid');


for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        grid.appendChild(cell);
    }
}

function updateGrid() {
    document.querySelectorAll('.cell').forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        cell.classList.remove('vacuum');
        if (floor[row][col] === 1) {
            cell.classList.add('dirty');
        } else {
            cell.classList.add('clean');
        }
    });

  
    const vacuumCell = document.querySelector(`.cell[data-row='${vacuumPosition.row}'][data-col='${vacuumPosition.col}']`);
    vacuumCell.classList.add('vacuum');

    
    if (floor[vacuumPosition.row][vacuumPosition.col] === 1) {
        floor[vacuumPosition.row][vacuumPosition.col] = 0; 
        vacuumCell.classList.remove('dirty');
        vacuumCell.classList.add('clean');
    }
}

function checkAllClean() {
    return floor.flat().every(cell => cell === 0);
}

function moveVacuum(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (vacuumPosition.row > 0) {
                vacuumPosition.row--;
            }
            break;
        case 'ArrowDown':
            if (vacuumPosition.row < gridSize - 1) {
                vacuumPosition.row++;
            }
            break;
        case 'ArrowLeft':
            if (vacuumPosition.col > 0) {
                vacuumPosition.col--;
            }
            break;
        case 'ArrowRight':
            if (vacuumPosition.col < gridSize - 1) {
                vacuumPosition.col++;
            }
            break;
    }
    updateGrid();
    if (checkAllClean()) {
        endMessage.style.visibility = 'visible'; 
        endMessage.innerHTML = "🎉 Congratulations! You've cleaned the entire floor! 🎉";
        
    }
}

updateGrid();
document.addEventListener('keydown', moveVacuum);
