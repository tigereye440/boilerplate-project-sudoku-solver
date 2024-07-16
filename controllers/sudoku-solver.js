const Checker = require('./checks')

const checks = new Checker();

class SudokuSolver {

  // Function for validating puzzle string
  validate(puzzle = '') {
    
    // Check if puzzle contains invalid characters, not numbers or periods 
    if (!/^[1-9\.]+$/.test(puzzle)) {
      return 'Invalid characters in puzzle';
    }

    // Check if puzzle is exaclty 81 characters long
    if (puzzle.length !== 81) {
      return 'Expected puzzle to be 81 characters long'
    }

    // Puzzle passes all test
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let puzzelGrid = checks.transform(puzzleString);
    row = checks.convertCharToNumber(row);

    let cellValue = puzzelGrid[row - 1][column - 1];

    if (cellValue == value) {
      return true; // Value is the same as one in cell, return true
    } 

    for (let i = 0; i < 9; i++) {
      if (puzzelGrid[row - 1][i] == value) {
        return false; // Value can be found in a cell in the row, return false;
      }
    }

    return true; // Value is not in any cell in the row, return true
  }

  // Checks to see if given number is valid for the column in its current state
  checkColPlacement(puzzleString, row, column, value) {
    let puzzelGrid = checks.transform(puzzleString);
    row = checks.convertCharToNumber(row);

    let cellValue = puzzelGrid[row - 1][column - 1];

    if (cellValue == value) {
      return true; // Value is the same as one in cell, return true
    }

    for (let i = 1; i < 9; i++) {
      if (puzzelGrid[i][column - 1 ] == value) {
        return false; // Value is not in any cell in the row, return true
      }
    }
    
    return true; // Value cannot be found in any cell in the column, return true
  }

  // Checks to see if value is valid for the subgrid(3x3 grid) in its current state
  checkRegionPlacement(puzzleString, row, column, value) {
    let puzzelGrid = checks.transform(puzzleString);
    row = checks.convertCharToNumber(row);

    let cellValue = puzzelGrid[row - 1][column - 1];

    // If value in the first cell is same as one supplied, return true
    if (cellValue == value) {
      return true; 
    }

    // Value should be for an empty cell or should be equal to the value in the occupied cell
    if (cellValue !== 0) {
      return false; 
    }

    let rowStart = row - (row % 3);
    let columnStart = column - (column % 3);

    // Iterate over all cells in the subgrid and determine if value is valid for the region
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // If value is cell is same as value, return false
        if (puzzelGrid[i + rowStart][j + columnStart] == value) {
          return false; 
        }
      }
      
    }

    // Value not found in region, return true
    return true;
  }

  isValid(puzzelGrid, row, col, value) {
    for (let i = 0; i <= 8; i++) {
       if (puzzelGrid[row][i] == value) return false;
    }

    for (let i = 0; i <= 8; i++) {
       if (puzzelGrid[i][col] == value) return false;
    }

    let startRow = row - (row % 3),
      startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzelGrid[i + startRow][j + startCol] == value) return false;
      }
    }
    return true;
  }

  solveSudoku(puzzelGrid, row, col) {
    const N = 9;
    if (row == N - 1 &&  col == N) return true;

    if (col == N) {
      row++;
      col = 0;
    }
    
    if (puzzelGrid[row][col] !== 0) {
      return this.solveSudoku(puzzelGrid, row, col + 1);
    }

    for (let val = 1; val < 10; val++) {
      if (this.isValid(puzzelGrid, row, col, val)) {
        puzzelGrid[row][col] = val;

        if (this.solveSudoku(puzzelGrid, row, col + 1)) return true;
      }
      puzzelGrid[row][col] = 0;
    }
    return false;
  }

  solve(puzzleString) {
    let validPuzzle = this.validate(puzzleString);
    if (validPuzzle !== true) {
      return false;
    }
    let puzzelGrid = checks.transform(puzzleString);
    let solved = this.solveSudoku(puzzelGrid, 0, 0);

    if (!solved) {
      return false;
    }

    let solvedString = checks.reverseTranform(puzzelGrid);
    console.log(solvedString);
    return solvedString;
    
  }
}

module.exports = SudokuSolver;

