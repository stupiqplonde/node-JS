// сервер

// node модули
import http from 'http';
import fs from 'fs/promises';
import path from 'path';

// наши модули
import { reindexIds, formatDate } from './utils/helper.js';
import { saveData, loadData} from './utils/fileManager.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

let notes = loadData();

const server = http.createServer(async (req, res) => {
    const {url, method} = req;
    // API
    if (url === '/' && method === 'GET'){
        const html = await fs.readFile(path.join(__dirname, "public", "index.html"), "utf-8");
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
        return;
    }

    if (url === '/api/app.js' && method === 'GET'){
        const js = await fs.readFile(path.join(__dirname, "api", "app.js"), "utf-8");
        res.writeHead(200, {"Content-Type": "application/javascript"});
        res.end(js);
        return;
    }

    if (url === '/api/notes' && method === 'GET'){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(notes));
        return;
    }

    if (url === "/api/notes" && method === 'POST'){
        let body = "";
        req.on("data", (chunk) => body += chunk);
        req.on("end", async() => {
            const {title, content} = JSON.parse(body);
            const newNote = {
                id: notes.length + 1,
                title: title,
                content: content,
                date: formatDate()
            };

            notes.push(newNote);
            saveData(notes);
            
        });
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({succes: true}));
        return;
    }

    if (url.startsWith("/api/notes/") && method === 'DELETE'){
        const id = parseInt(url.split('/')[3])

        if(id >= 0 && id < notes.length){
            notes.splice(id -1, 1)
            notes = reindexIds(notes)
            await saveData(notes)

            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({succes: true}))
        }else{
            res.writeHead(404)
            res.end(JSON.stringify({succes: false}))
        }
    }

    if (url.startsWith("/api/notes/") && method === 'PUT'){
        const id = parseInt(url.split('/')[3]);
        
        let body = "";
        req.on("data", (chunk) => body += chunk);
        req.on("end", async() => {

            const {title, content} = JSON.parse(body);
            const noteIndex = notes.findIndex(note => note.id === id);
            notes[noteIndex] = {
                    ...notes[noteIndex],
                    title: title,
                    content: content,
                    date: formatDate() 
                };
                await saveData(notes);
            });

            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({succes: true}));
            return;    
    }

    return; 
});

server.listen(3000, () => {
    console.log("Сервер запущен http://localhost:3000")
});

