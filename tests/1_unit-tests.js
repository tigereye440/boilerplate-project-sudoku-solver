const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const puzzelStrings = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
const incompleteString = '..839.7.575.....964..1.......16.29846.9.312.7..754...62..5.78.8...3.2...492...1'
const invalidString = '1.5..2.84..63.12.7.2..5..;..A..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
let solver;
console.log(puzzelStrings[0][0])

solver = new Solver();

suite('Unit Tests', () => {
    suite('Puzzel String Validation Tests', () => {
        test('#1 Logic handles a valid puzzle string of 81 characters', (done) => {
            assert.equal(solver.validate(puzzelStrings[0][0]), true);
            done();
        });
    
        test('#2 Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
            assert.equal(solver.validate(invalidString), 'Invalid characters in puzzle');
            done();
        });
    
        test('#3 Logic handles a puzzle string that is not 81 characters in length', (done) => {
            assert.equal(solver.validate(incompleteString), 'Expected puzzle to be 81 characters long');
            done();
        });
    });

    suite('Value Placement Checks', () => {
        test('#4 Logic handles a valid row placement', (done) => {
            assert.equal(solver.checkRowPlacement(puzzelStrings[0][0], 'A', '2', 3), true);
            done();
        });
    
        test('#5 Logic handles a invalid row placement', (done) => {
            assert.equal(solver.checkRowPlacement(puzzelStrings[0][0], 'A', '2', 1), false);
            done();
        });
    
        test('#6 Logic handles a valid column placement', (done) => {
            assert.equal(solver.checkColPlacement(puzzelStrings[0][0], 'B', '1', 7), true);
            done();
        });
    
        test('#7 Logic handles a invalid column placement', (done) => {
            assert.equal(solver.checkColPlacement(puzzelStrings[0][0], 'B', '1', 8), false);
            done();
        });
    
        test('#8 Logic handles a valid region (3x3 grid) placement', (done) => {
            assert.equal(solver.checkRegionPlacement(puzzelStrings[0][0], 'B', '2', 4), true);
            done();
        });
    
        test('#9 Logic handles a invalid region (3x3 grid) placement', (done) => {
            assert.equal(solver.checkRegionPlacement(puzzelStrings[0][0], 'B', '2', 6), false);
            done();
        });
    
    });

    suite('Solver Tests', () => {
        test('#10 Valid puzzle strings pass the solver', (done) => {
            assert.equal(solver.solve(puzzelStrings[0][0]), puzzelStrings[0][1]);
            done();
        });

        test('#11 Invalid puzzle strings fail the solver', (done) => {
            assert.equal(solver.solve(invalidString), false);
            done();
        });

        test('#12 Solver returns the expected solution for an incomplete puzzle', (done) => {
            assert.equal(solver.solve(puzzelStrings[1][0]),  puzzelStrings[1][1]);
            done();
        });
    })
    

    
    
});
