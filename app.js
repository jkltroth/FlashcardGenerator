const inquirer = require('inquirer');
const ClozeCard = require('./clozeCard.js');
const BasicCard = require('./basicCard.js');

let flashCardArray = [];

const prompts = {
    // Prompt object for flashcard type
    flashCardTypePrompt: {
        type: "list",
        name: "flashCardType",
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
        message: "Would you like to create another flashcard?"
    }
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

            flashCardArray.push(newBasicCard);

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

            flashCardArray.push(newClozeCard);

            moreCards();
        });
};

// Function to make more cards
const moreCards = function () {
    console.log('------------------');
    inquirer.prompt(prompts.createMoreCardsPrompt)
        .then(function (answers) {

            if (answers.createMoreCards) {
                makeFlashCards();
            } else if (!answers.createMoreCards) {
                //print flash cards
                console.log(flashCardArray);
            }

        });
}

// Function to print flash cards
const printCards = function () {
    flashCardArray.forEach(function(element){
        console.log('Front: ' + '\nBack: ');
    });
}

// Function to make flash cards
const makeFlashCards = function () {
    console.log('------------------');
    inquirer.prompt(prompts.flashCardTypePrompt)
        .then(function (answers) {

            if (answers.flashCardType === "Basic card") {
                createNewBasicCard();
            } else if (answers.flashCardType === "Cloze card") {
                createNewClozeCard();
            }
        });
};

makeFlashCards();

// // // // // TESTING => // // // // // 

// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front);

// // "George Washington"
// console.log(firstPresident.back);

// var firstPresidentCloze = new ClozeCard(
//     "George Washington was the first president of the United States.", "George Washington");

// // "George Washington"
// console.log(firstPresidentCloze.cloze);

// // " ... was the first president of the United States.
// console.log(firstPresidentCloze.partial);

// // "George Washington was the first president of the United States.
// console.log(firstPresidentCloze.fullText);