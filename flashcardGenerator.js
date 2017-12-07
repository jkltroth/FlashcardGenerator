const inquirer = require('inquirer');
const ClozeCard = require('./clozeCard.js');
const BasicCard = require('./basicCard.js');

let flashcardArray = [];

const prompts = {

    letsStartPrompt: {
        type: "confirm",
        name: "letsStart",
        message: "Do you want to make some flashcards?"
    },
    // Prompt object for flashcard type
    flashcardTypePrompt: {
        type: "list",
        name: "flashcardType",
        message: "What type of flashcard do you want to create?",
        choices: ["Basic card", "Cloze card"]
    },
    // Prompt object to create front of flashcard
    addFrontPrompt: {
        type: "input",
        name: "addFront",
        message: "Enter text for the front of the flashcard:"
    },
    // Prompt object to create back of flashcard
    addBackPrompt: {
        type: "input",
        name: "addBack",
        message: "Enter text for the back of the flashcard:"
    },
    // Prompt object to create full text of flashcard
    addFullTextPrompt: {
        type: "input",
        name: "addFullText",
        message: "Enter the full text for the flashcard:"
    },
    // Prompt object to create cloze deletion of flashcard
    addClozeDeletionPrompt: {
        type: "input",
        name: "addClozeDeletion",
        message: "What part of the full text is the cloze deletion?"
    },
    // Prompt object to make another card
    createMoreCardsPrompt: {
        type: "confirm",
        name: "createMoreCards",
        message: "Would you like to create more flashcards?"
    }
};

const runProgram = function () {
    console.log('------------------');
    inquirer.prompt(prompts.letsStartPrompt)
        .then(function (answers) {
            if (answers.letsStart) {
                makeFlashcards();
            } else if (!answers.letsStart) {
                console.log('------------------');
                console.log('Maybe next time!');
            }
        });
}

// Function to make flash cards
const makeFlashcards = function () {
    console.log('------------------');
    inquirer.prompt(prompts.flashcardTypePrompt)
        .then(function (answers) {

            if (answers.flashcardType === "Basic card") {
                createNewBasicCard();
            } else if (answers.flashcardType === "Cloze card") {
                createNewClozeCard();
            }
        });
};

//function to create newBasicCard
const createNewBasicCard = function () {
    console.log('------------------');
    inquirer.prompt([prompts.addFrontPrompt, prompts.addBackPrompt])
        .then(function (answers) {

            let newBasicCard = new BasicCard(
                answers.addFront,
                answers.addBack
            );

            flashcardArray.push('Front: ' + newBasicCard.front + '\nBack: ' + newBasicCard.back);
            
            moreCards();
        });
};

// Function to create newClozeCard
const createNewClozeCard = function () {
    console.log('------------------');
    inquirer.prompt([prompts.addFullTextPrompt, prompts.addClozeDeletionPrompt])
        .then(function (answers) {

            let newClozeCard = new ClozeCard(
                answers.addFullText,
                answers.addClozeDeletion
            );

            if (newClozeCard.partial) {
                flashcardArray.push('Front: ' + newClozeCard.partial + '\nBack: ' + newClozeCard.fullText);
                moreCards();
            } else if (!newClozeCard.partial) {
                console.log('------------------');
                console.log('Error: "' + newClozeCard.cloze + '" does not exist in the string "' + newClozeCard.fullText + '"');
                console.log('Please try again');
                createNewClozeCard();
            }
        });
};

// Function to make more cards
const moreCards = function () {
    console.log('------------------');
    inquirer.prompt(prompts.createMoreCardsPrompt)
        .then(function (answers) {
            if (answers.createMoreCards) {
                makeFlashcards();
            } else if (!answers.createMoreCards) {
                printCards();
            }
        });
}

// Function to print flash cards
const printCards = function () {

    for (var i = 0; i < flashcardArray.length; i++) {
        console.log('------------------');
        console.log('Flashcard #' + (i + 1));
        console.log(flashcardArray[i]);
    }
};

runProgram();