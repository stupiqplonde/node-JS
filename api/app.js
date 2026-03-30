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
        const res = await fetch(`api/notes/${id}`, {method: 'POST'})

        if(res.ok){
            await showNotes();
        }
        else{
            alert("Неизвестная ошибка")
        }
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
        alert("Заметок пока нет");
        return;
    }

    const list = notes.map(n => `${n.id.toString().padStart(3)}: ${n.title}`).join('\n');
    const input = prompt(`Введите номер заметки для удаления: \n \n ${list}`);

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

async function editNote(){
    await loadNotes();

    if(notes.length === 0){
        alert("Заметок пока нет");
        return;
    }

    const list = notes.map(n => `${n.id.toString().padStart(3)}: ${n.title}`).join('\n');
    const input = prompt(`Введите номер заметки для редактирования: \n \n ${list}`);
    
    const id = parseInt(input);

    if (isNaN(id)){
        alert("Требуется ввести число");
        return;
    }

    const note = notes.find(note => note.id === id);

    const title = prompt("Введите название:", note.title);
    const content = prompt("Введите содержание:", note.content);

    try{
        const res = await fetch(`api/notes/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, content}),
        });
    

        if(res.ok){
            await showNotes();
        }
        else{
            alert("Неизвестная ошибка")
        }
    }
    catch(error){
        console.log("ERROR", error.message);
    }





    // const noteToEdit = notes.find(n => n.id === id);
    
    // if (!noteToEdit){
    //     alert("Заметка с таким номером не найдена");
    //     return;
    // }

    // const newTitle = prompt("Введите новый заголовок (или оставьте пустым для сохранения текущего):", noteToEdit.title);
    // const newContent = prompt("Введите новое содержание (или оставьте пустым для сохранения текущего):", noteToEdit.content);

    // if (newTitle === null || newContent === null){
    //     return;
    // }

    // try{
    //     const res = await fetch(`api/notes/${id}`, {
    //         method: "PUT",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({
    //             title: newTitle.trim() || noteToEdit.title,
    //             content: newContent.trim() || noteToEdit.content
    //         }),
    //     });

    //     if(res.ok){
    //         await showNotes();
    //         stat.innerText = `Заметка "${noteToEdit.title}" изменена`;
    //     }
    //     else{
    //         alert("Неизвестная ошибка при редактировании");
    //     }
    // }
    // catch(error){
    //     console.log("ERROR", error.message);
    //     alert("Ошибка при редактировании заметки");
    // }
}

loadNotes();