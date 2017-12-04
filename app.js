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
    // Prompt object to create question
    addQuestion: {
        type: "input",
        name: "addQuestion",
        message: "Who are you???"
    },
    // Prompt object to create answer
    addAnswer: {
        type: "input",
        name: "addAnswer",
        message: "Who are you???"
    },
    // Prompt object to create cloze
    addCloze: {
        type: "input",
        name: "addCloze",
        message: "Who are you???"
    },
    // Prompt object to make another card
    createNewCardPrompt: {
        type: "confirm",
        name: "createNewCard",
        message: "Would you like to create another flashcard?"
    }
};

// Function to make flash cards
const makeFlashCards = function () {

    inquirer.prompt(prompts.flashCardTypePrompt)
        .then(function (answers) {

            if (answers.flashCardType === "Basic card") {
                console.log("You chose basic bitch...")
            } else if (answers.flashCardType === "Cloze card") {
                console.log("You chose cloze fa hoez...")
            }

        });
};

//function to create newBasicCard
const createNewBasicCard = function () {

};

//function to create newClozeCard
const createNewClozeCard = function () {

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