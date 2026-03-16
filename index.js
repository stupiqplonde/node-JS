// инициализация
const readline = require('readline');
const helper = require("./utils/helper");
const ConsoleDecorator = require("./utils/decorator");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PROJ_NAME = "NOTE-BOOK";
let welcome = `Приветствуем в пиложении ${PROJ_NAME}`;

let notes = [];

const welcomeApp = () => {
    console.log(`Приветствуем в приложении ${PROJ_NAME}`);
    showMenu();
}

const addNote = () => {
    rl.question("Введите название заметки", (title) => {
        rl.question("Ведите содержимое заметки", (content) => {
            const newNote = {
                id: notes.length + 1,
                title: title,
                content: content,
                date: helper.formatDate()
            };

            notes.push(newNote);
            console.log(`всего заметок ${notes.length}`)
            showMenu();
        });
    });
};

const showNotes = () => {
    if(notes.length === 0){
        console.log("Пока заметок нет");
    }
    ConsoleDecorator.showAllFormatNotes(notes);
    showMenu();
};

const editNote = () => {
    if(notes.length === 0){
        console.log("нет заметок для редактирования");
        showMenu();
        return;
    }
    notes.forEach((note) => {
        console.log('=== ваши заметки ===')
        console.log(`[${note.id}] * ${note.title} - Цель: ${note.content || 'не указана'}`);
    });
    
    rl.question('Введите номер заметки для редактирования или 0 для отмены: ', (choice) => {
        let num = parseInt(choice);
        if(num === 0){
            console.log("Отмена редактирования");
            showMenu();
        }
        else if(num > 0 && num <= notes.length){
            const noteIndex = num - 1;

            rl.question('Введите новый заголовок (или оставьте пустым для сохранения текущего): ', (newTitle) => {
                if (newTitle.trim()) {
                    notes[noteIndex].title = newTitle;
                }
                
                rl.question('Введите новую цель (или оставьте пустым для сохранения текущей): ', (newСontent) => {
                    if (newСontent.trim()) {
                        notes[noteIndex].content = newСontent;
                    }
                    
                    console.log('✓ заметка изменена');
                    showMenu();
                });
            });
        }
        else{
            console.log('нет такой заметки');
            showMenu();
        }
    });
}

const showMenu = () => {
    console.log('1. Добавить заметку');
    console.log('2. Посмотреть заметки');
    console.log('3. Удалить заметку');
    console.log('4. Изменить заметку');

    rl.question('Выберите действие 1-3 (0 для выхода)', (choice) => {
        switch(choice){
            case '1': 
                addNote();
                break;
            case '2':
                showNotes();
                break;
            case '3':
                deleteNote();
                break;
            case '4':
                editNote();
                break;
            case '0':
                rl.close();
                break;
            default:
                showMenu();
                break;
        }
    });
};

const deleteNote = () => {
    if(notes.length === 0){
        console.log("нет заметок для удаления");
        showMenu();
        return;
    }
    notes.forEach((note) => {
        console.log('=== ваши заметки ===')
        console.log(`[${note.id}] * ${note.title}`);
    });
    rl.question('Введите номер заметки для удаления или 0 для отмены', (choice) => {
        let num = parseInt(choice);
        if(num === 0){
            console.log("Отмена удаления");
        }
        else if(num > 0 && num <= notes.length){
            notes.splice(num - 1, 1);
            notes = helper.reindexIds(notes);
            console.log('заметка удалена')
        }
        else{
            console.log('нет такой заметки')
        }
        showMenu();
    });
}

showMenu();