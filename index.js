// инициализация
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PROJ_NAME = "NOTE-BOOK";
let welcom = `Приветствуем в пиложении ${PROJ_NAME}`;

let notes = [];

const addNote = () => {
    rl.question("Введите название заметки", (title) => {
        rl.question("Ведите содержимое заметки", (content) => {
            const newNot = {
                id: notes.length + 1,
                title: title,
                content: content,
                date: new Date.toLocalString()
            }

            notes.push(newNote);
            console.log(`всего заметок ${notes.length}`)
        });
    });
};

const showMenu = () => {
    console.log(welcome);
    addNote();
}

showMenu();