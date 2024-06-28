/*
	Lucas Torres
    lucas_torres@student.uml.edu
    COMP.4610 OL CE2 045 GUI Programming I 2024 Summer
    Homework 5
*/

const boardSize = 15;

// dict with all the important information regarding each tile
var tiles = {
    "A": {"value":  1, "dist":  9, "count": 0},
    "B": {"value":  3, "dist":  2, "count": 0},
    "C": {"value":  3, "dist":  2, "count": 0},
    "D": {"value":  2, "dist":  4, "count": 0},
    "E": {"value":  1, "dist": 12, "count": 0},
    "F": {"value":  4, "dist":  2, "count": 0},
    "G": {"value":  2, "dist":  3, "count": 0},
    "H": {"value":  4, "dist":  2, "count": 0},
    "I": {"value":  1, "dist":  9, "count": 0},
    "J": {"value":  8, "dist":  1, "count": 0},
    "K": {"value":  5, "dist":  1, "count": 0},
    "L": {"value":  1, "dist":  4, "count": 0},
    "M": {"value":  3, "dist":  2, "count": 0},
    "N": {"value":  1, "dist":  6, "count": 0},
    "O": {"value":  1, "dist":  8, "count": 0},
    "P": {"value":  3, "dist":  2, "count": 0},
    "Q": {"value": 10, "dist":  1, "count": 0},
    "R": {"value":  1, "dist":  6, "count": 0},
    "S": {"value":  1, "dist":  4, "count": 0},
    "T": {"value":  1, "dist":  6, "count": 0},
    "U": {"value":  1, "dist":  4, "count": 0},
    "V": {"value":  4, "dist":  2, "count": 0},
    "W": {"value":  4, "dist":  2, "count": 0},
    "X": {"value":  8, "dist":  1, "count": 0},
    "Y": {"value":  4, "dist":  2, "count": 0},
    "Z": {"value": 10, "dist":  1, "count": 0},
    "_": {"value":  0, "dist":  2, "count": 0},
};
var wordScore;
var gameScore;

function resetAll() {
    resetCount();
    clearBoard();
    clearTiles();
    gameScore = 0;
    fillHand();
    updateScore();
}
$('#gameReset').on('click', resetAll);
$('#wordSubmit').on('click', submitWord);

// reset the counts of the tiles to match the starting values
function resetCount() {
    Object.entries(tiles).forEach(([k, v]) => {
        v['count'] = v['dist'];
    });
    console.log('Reset tile counts');
}

// returns how many tiles are remaining
function getRemainingTileCount() {
    let count = 0;
    Object.entries(tiles).forEach(([k, v]) => {
        count += v['count'];
    });
    return count;
}

// destroys any tiles on the board and resets the data state accordingly
function clearBoard() {
    let boardContents = $('#board').data('contents');
    if (boardContents !== undefined) {
        // delete tiles
        for (x of boardContents) {
            if (x !== null) {
                x.remove();
            }
        }
    }
    $('#board').data('contents', Array(boardSize).fill(null));
}

function clearTiles() {
    $('div.tile').remove();
}

function isBoardEmpty() {
    return $('#board').data('contents').every((elem) => {return elem === null});
}

// setup the board to be "droppable"
$('#board').droppable({});

// Get a random integer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function tileDragRevert(droppable) {
    // tile can't be dropped on nothing
    if (droppable === false) {
        return true;
    }

    // tile has been dragged onto the board
    if (droppable) {
        // (try to) move the tile into the nearest empty spot

        let boardPos = $('#board').offset();
        let tilePos = $(this).offset();
        let tileWidth = $(this).width();
        let offsetX = 0;

        // iterate over the possible tile positions on the board
        for (let i = 0; i < boardSize; i++) {
            // calculate distance to identify which slot the tile was attempted to be dropped on
            let dist = Math.abs(boardPos.left + offsetX - tilePos.left);
            if (dist < tileWidth / 2) {
                let boardContents = $('#board').data('contents');
                // found which slot the tile should go into, check if it's valid
                if (boardContents[i] !== null) {
                    // slot already has something in it, tile can't go here
                    return true;
                }
                if (!isBoardEmpty() && !(i != 0 && boardContents[i-1] !== null) && !(i != boardSize - 1 && boardContents[i+1] !== null)) {
                    // this is not the first slot getting populated and neither neighboring slot is populated
                    return true;
                }

                // move the tile into the slot and return false to indicate the
                // tile should not be reverted to its original position
                boardContents[i] = $(this);
                $(this).position({
                    my: 'left top',
                    at: 'left+' + offsetX + ' top',
                    of: '#board'
                })
                $(this).draggable('disable');

                updateScore();
                return false;
            }
            offsetX += tileWidth;
        }

    }
    return true;
}

// picks a letter (for a tile) randomly, with the chances being proportional
// to the remaining amount of tiles
function chooseLetter() {
    let tileCount = getRemainingTileCount();
    if (tileCount <= 0) {
        // no tiles remaining
        return false;
    }
    let choice = getRandomInt(0, tileCount);

    // figure out which tile we've just picked
    let sum = 0;
    for (const k in tiles) {
        sum += tiles[k]['count'];

        if (sum > choice) {
            // we've found the tile we've picked, reduce the amount remaining
            // and return its letter
            tiles[k]['count'] -= 1;
            return k;
        }
    }
}

// creates a tile div, randomly selected
function spawnTile() {
    let letter = chooseLetter();
    if (!letter) {
        return false;
    }

    let tileDiv = $('<div>', {'class': 'tile'});
    let tileImg = $('<img>', {'class': 'tile', 'src': 'image/tile_' + letter + '.jpg'});
    tileImg.appendTo(tileDiv);
    tileDiv.data('letter', letter);
    tileDiv.appendTo('body');
    tileDiv.draggable({revert: tileDragRevert, revertDuration: 100, zIndex: 100});
    return tileDiv;
}

// create tiles and place them on the tile holder
function fillHand() {
    const handSize = 7;
    const spacing = 5;

    let existingTiles = $('div.tile');
    let j = 0;

    let xPos = 45;
    for (let i = 0; i < handSize; i++) {
        // use existing tiles before creating new ones
        if (j < existingTiles.length) {
            tile = existingTiles.eq(j++);
        } else {
            tile = spawnTile();
            if (tile === false) {
                // leave this function if we're out of tiles
                return;
            }
        }

        // place the tile neatly in the hand
        tile.position({
            my: 'left bottom',
            at: 'left+' + xPos + ' bottom-44',
            of: '#holder'
        });
        xPos += tile.width() + spacing;
    }
}


// re-calculate the current word's score and update the score text divs on the page
function updateScore() {
    // calculate the score of the current word
    wordScore = 0;
    let wordMult = 1;
    let boardContents = $('#board').data('contents');
    // iterate over the slots on the board
    for (i in boardContents) {
        if (boardContents[i] !== null) {
            // there is a tile on this slot, add its base value
            let baseValue = tiles[boardContents[i].data('letter')]['value'];

            if (i == 6 || i == 8) {
                // this slot is a DLS, double the tile's base value
                baseValue *= 2;
            }

            if (i == 2 || i == 12) {
                // this slot is a DWS, double the word wordMult
                wordMult *= 2;
            }
            wordScore += baseValue;
        }
    }
    wordScore *= wordMult;
    $("#wordScore").text(wordScore);
    $("#gameScore").text(gameScore);

    let count = getRemainingTileCount();
    $("#tilesLeft").text(count);
    if (count > 10) {
        $("#tilesLeft").addClass('bg-secondary').removeClass('bg-warning').removeClass('bg-danger');
    } else if (count > 0) {
        $("#tilesLeft").addClass('bg-warning').removeClass('bg-secondary').removeClass('bg-danger');
    } else {
        $("#tilesLeft").addClass('bg-danger').removeClass('bg-secondary').removeClass('bg-warning');

    }
}

function submitWord() {
    gameScore += wordScore;
    clearBoard();
    fillHand();
    updateScore();
}


$( document ).ready(function() {
    resetAll();
});
