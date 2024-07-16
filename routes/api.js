'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const Checker = require('../controllers/checks.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
  let checker = new Checker();
  app.route('/api/check')
    .post((req, res) => {
      let { puzzle = '', coordinate = '', value = '' } = req.body;

      if ((puzzle == '' || coordinate == '' || value == '')) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      
      if (isNaN(value) || (Number(value) < 1 || Number(value) > 9)) {
        return res.json({ error: 'Invalid value' });
      }

      // Puzzle string validation
      const isValidString = solver.validate(puzzle);

      if (isValidString !== true) {
        return res.json({error: isValidString});
      }

      if (coordinate.length !== 2) {
        return res.json({ error: 'Invalid coordinate'})
      }
      
      const row = coordinate.length === 2 ? coordinate.match(/[A-Z]/).toString() : 0;
      const col = Number(coordinate.match(/[\d]+/));

      const isValidRowVal = !isNaN(checker.convertCharToNumber(row)) ? true : false;
      const isValidColVal = (col >= 1 && col <= 9) ? true : false;

      if (!isValidRowVal || !isValidColVal) {
        return res.json({ error: 'Invalid coordinate' });
      }

      
      const validInRow = solver.checkRowPlacement(puzzle, row, col, value);
      const validInColumn = solver.checkColPlacement(puzzle, row, col, value);
      const validInRegion = solver.checkRegionPlacement(puzzle, row, col, value);
      let conflict = [];

      if (validInColumn && validInRow && validInRegion) {
        res.json({ valid: true });
      } else {
        if (!validInRow) {
          conflict.push("row")
        }

        if (!validInColumn) {
          conflict.push("column");
        }

        if (!validInRegion) {
          conflict.push("region");
        }

        return res.json({ valid: false, conflict: conflict });
      }


    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      
      if (puzzle === '' || !puzzle) {
        return res.json({ error: 'Required field missing'})
      } 

      // Puzzle string validation
      const isValidString = solver.validate(puzzle);
      if (isValidString !== true) {
        return res.json({error: isValidString});
      }

      const solved = solver.solve(puzzle);
      if (!solved) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }

      return res.json({ solution: solved });
    });
};
