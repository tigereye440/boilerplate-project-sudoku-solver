const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzelStrings = require('../controllers/puzzle-strings').puzzlesAndSolutions;
const incompleteString = '..839.7.575.....964..1.......16.29846.9.312.7..754...62..5.78.8...3.2...492...1';
const invalidString = '1.5..2.84..63.12.7.2..5..;..A..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const unsolvalbeString = '5...7...6...1.5....9.8.6..8...6...34..8.3..17...2...6..6....28...419..5....8..7.9';

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('/api/solve tests', () => {
        test('#1 Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .post('/api/solve')
                .send({
                    puzzle: puzzelStrings[0][0]
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.solution, puzzelStrings[0][1]);
                    done();
                });
        });

        test('#2 Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .post('/api/solve')
                .send({
                    puzzle: ''
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field missing');
                    done();
                });
        });

        test('#3 Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .post('/api/solve')
                .send({
                    puzzle: invalidString
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });

        test('#4 Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .post('/api/solve')
                .send({
                    puzzle: incompleteString
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });

        test('#5 Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
            chai
                .request(server)
                .post('/api/solve')
                .send({
                    puzzle: unsolvalbeString
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Puzzle cannot be solved');
                    done();
                });
        });
    });
    
    suite('/api/check tests', () => {
        test('#6 Check a puzzle placement with all fields: POST request to /api/check', (done) => {
            chai
                .request(server)
                .post('/api/check')
                .send({
                    puzzle: puzzelStrings[2][0],
                    coordinate: 'A1',
                    value: 2 
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, true);
                    done();
                });
        });

        test('#7 Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
            chai
                .request(server)
                .post('/api/check')
                .send({
                    puzzle: puzzelStrings[2][0],
                    coordinate: 'B5',
                    value: 7
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict[0], 'row');
                    done();
                });
        });

        test('#8 Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
            chai
                .request(server)
                .post('/api/check')
                .send({
                    puzzle: puzzelStrings[2][0],
                    coordinate: 'A2',
                    value: 7
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict.length, 2);
                    done();
                });
        });

        test('#9 Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
            chai
                .request(server)
                .post('/api/check')
                .send({
                    puzzle: puzzelStrings[2][0],
                    coordinate: 'A2',
                    value: 5
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict.length, 3);
                    done();
                });
        });

        test('#10 Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
            chai
                .request(server)
                .post('/api/check')
                .send({
                    puzzle: puzzelStrings[2][0],
                    coordinate: 'A2',
                    
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('#11 Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
            chai
                .request(server)
                .post('/api/check')
                .send({
                    puzzle: invalidString,
                    coordinate: 'A2',
                    value: 5
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });

        test('#12 Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
            chai
                .request(server)
                .post('/api/check')
                .send({
                    puzzle: incompleteString,
                    coordinate: 'A2',
                    value: 5
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });

        test('#13 Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
            chai
                .request(server)
                .post('/api/check')
                .send({
                    puzzle: puzzelStrings[0][0],
                    coordinate: 'A12',
                    value: 5
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid coordinate');
                    done();
                });
        });

        test('#14 Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
            chai
                .request(server)
                .post('/api/check')
                .send({
                    puzzle: puzzelStrings[1][0],
                    coordinate: 'A2',
                    value: 12
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid value');
                    done();
                });
        });

    });
});

