const stat = document.getElementById("stat");
const content = document.getElementById("content");

let notes = []

async function loadNotes(){
    try{
        const res = await fetch("api/notes");
        notes = await res.json();
        stat.innerText = `Заметок ${notes.length}`;
    }
    catch(error){
        console.log("ERROR", error.message);
        stat.innerText = `Заметки не найдены`;
    }
}

async function addNote(){
    const title = prompt("Введите название:");
    const content = prompt("Введите содержание:");
    if(title === null || content === null){
        stat.innerText = `Поля должны быть заполнены`;
        return;
    }

    try{
        await fetch("api/notes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, content}),
        });
    }
    catch(error){
        console.log("ERROR", error.message);
    }
}

async function showNotes() {
    await loadNotes();
    
    if(notes.length === 0){
        content.innerText = "Заметок пока нет"
    }

    let html = '<h3>Заметки:</h3>';

    notes.forEach(note => {
        html += `
        <div> 
            <small>[${notes.id}] ${notes.date}</small>
            <strong>${notes.title}</strong>
            ${note.content}
        </div>
        `;
    })

    content.innerHTML = html
}

async function deleteNote(){
    await loadNotes();

    if(notes.length === 0){
        alert("Заметок пока нет")
        return
    }

    let list = ""
    for (const note of notes){
        list += `${note.id}: ${note.title}\n`
    }
    list = list.trim();

    const input = prompt(`Введите номер заметки для удаления: \n \n ${list}`)

    const id = parseInt(input);
    if (isNaN(id)){
        alert("Требуется ввести число")
        return
    }

    const res = await fetch(`api/notes/${id}`, {method: 'DELETE'})

    if(res.ok){
        await showNotes();
    }
    else{
        alert("Неизвестная ошибка")
    }
}

loadNotes();