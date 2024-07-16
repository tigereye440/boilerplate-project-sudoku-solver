class Checks {
    convertCharToNumber(char = '') {
        let nr;
        switch(char.toLowerCase()) {
            case "a":
                nr = 1;
                break;
            case "b":
                nr = 2;
                break;
            case "c":
                nr = 3;
                break;
            case "d":
                nr = 4;
                break;
            case "e":
                nr = 5;
                break;
            case "f":
                nr = 6;
                break;
            case "g":
                nr = 7;
                break;
            case "h":
                nr = 8;
                break;
            case "i":
                nr = 9;
                break;
            default:
                nr = 'Invalid coordinate';
                break;
            
        }
        return nr;
    }

    transform(puzzleString) {
        let puzzelGrid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        let row = -1;
        let col = 0;

        for (let i = 0; i < puzzleString.length; i++) {
            if (i % 9 ==  0) {
                row++;
            }

            if (col % 9 == 0) {
                col = 0;
            }

            puzzelGrid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
            col++;
        }
        return puzzelGrid;
    }

    reverseTranform(puzzelGrid = []) {
        return puzzelGrid.flat().join("");
    }
}

module.exports = Checks;
