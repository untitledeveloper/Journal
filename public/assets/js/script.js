var add_note, card_layout;
var add_content = getId("add_content")
var entry_content = getId("entry_content");
add_note = getId("add_note");
card_layout = getId("card_layout");

function getId(x) {
    return document.getElementById(x)
}

function renderEntry() {
    add_content.style.display = "none";
    entry_content.style.display = "block";
}

function saveData() {
    var div = getId("entry_content");
    var entry_title = getId("entry_title");
    var entry_journal = getId("entry_journal");

    console.log("Title: ", entry_title.value)
    console.log("Entry: ", entry_journal.value)

    const newEntry = {
        title : entry_title.value.trim(),
        text : entry_journal.value.trim(),
    }

    saveEntry(newEntry)

    div.style.display = "none"
    add_content.style.display = "block"

    entry_title.value = ""
    entry_journal.value = ""

    return recieveData()
}

function getEntries() {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
      });
}

function listData(item) {
    for (var i = 0; i < item.length; i++) {
        removeCards(item[i])
        renderCards(item[i])
    }
}

function removeCards(item) {
    $('#'+item['id']).remove();
}

function renderCards(item) {
    var entry = document.createElement("div");
    entry.className = "card journal_card";
    entry.id = item['id'];
    entry.innerHTML = `
    <div class='journal_header' id='header_${item['id']}'>    
        <button onclick='editData(${item['id']})' id='edit_button'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24" height="24"
        viewBox="0 0 172 172"
        style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M137.39844,14.33333c-5.18687,0 -10.37375,1.97531 -14.33333,5.9349l-8.39844,8.39844l28.66667,28.66667l8.39844,-8.39844c7.912,-7.912 7.912,-20.7475 0,-28.66667c-3.95958,-3.95958 -9.14646,-5.9349 -14.33333,-5.9349zM103.91667,39.41667l-82.41667,82.41667v28.66667h28.66667l82.41667,-82.41667z"></path></g></g></svg></button>
        <button onclick='deleteEntry(${item['id']})' id='delete_button'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24" height="24"
        viewBox="0 0 172 172"
        style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M40.13333,22.93333c-1.46702,0 -2.93565,0.55882 -4.05365,1.67969l-11.46667,11.46667c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l41.81302,41.81302l-41.81302,41.81302c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l11.46667,11.46667c2.24173,2.24173 5.87129,2.24173 8.10729,0l41.81302,-41.81302l41.81302,41.81302c2.236,2.24173 5.87129,2.24173 8.10729,0l11.46667,-11.46667c2.24173,-2.24173 2.24173,-5.87129 0,-8.10729l-41.81302,-41.81302l41.81302,-41.81302c2.24173,-2.236 2.24173,-5.87129 0,-8.10729l-11.46667,-11.46667c-2.24173,-2.24173 -5.87129,-2.24173 -8.10729,0l-41.81302,41.81302l-41.81302,-41.81302c-1.12087,-1.12087 -2.58663,-1.67969 -4.05365,-1.67969z"></path></g></g></svg></button>
    </div>

    <div class='journal_body' id='body_${item['id']}'>
        <h2 style='margin-bottom: 10px;'>${item['title']}</h2>
        <p>${item['text']}</p>
    </div>    
    `
    entry.innerHTML += `
    <div class='journal_header' style='display: none;' id='edit_header_${item['id']}'>
        <button class='button' onclick='reSave(${item['id']})' id='save_${item['id']}'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24" height="24"
        viewBox="0 0 172 172"
        style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M121.83333,21.5h-86c-7.955,0 -14.33333,6.45 -14.33333,14.33333v100.33333c0,7.88333 6.37833,14.33333 14.33333,14.33333h100.33333c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-86zM86,136.16667c-11.89667,0 -21.5,-9.60333 -21.5,-21.5c0,-11.89667 9.60333,-21.5 21.5,-21.5c11.89667,0 21.5,9.60333 21.5,21.5c0,11.89667 -9.60333,21.5 -21.5,21.5zM107.5,64.5h-71.66667v-28.66667h71.66667z"></path></g></g></svg></button>
    </div>
    
    <div class='journal_body' style='display: none;' id='edit_body_${item['id']}'>
        <input class='entry_title' type='text' value='${item['title']}' id='title_${item['id']}'>
        <textarea class='entry_journal' name='text_${item['id']}' cols='50' rows='20' id='entry_${item['id']}'>${item['text']}</textarea> 
    </div>
    `
    card_layout.appendChild(entry);
}

function recieveData() {
    return getEntries().then(function(data) {
        listData(data);
      });
}

function saveEntry(entry) {
    return $.ajax({
        url: "/api/notes",
        data: entry,
        method: "POST"
      });
}

function deleteEntry(id) {
    $('#'+id).remove();
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE"
      });
}

function editData(id) {
    getId('header_'+id).style.display = "none";
    getId('body_'+id).style.display = "none";
    getId('edit_body_'+id).style.display = "block";
    getId('edit_header_'+id).style.display = "block";
}

function reSave(id) {
    var title = getId('title_'+id);
    var text = getId('text_'+id);

    console.log(title, text);

    getId('header_'+id).style.display = "block";
    getId('body_'+id).style.display = "block";
    getId('edit_body_'+id).style.display = "none";
    getId('edit_header_'+id).style.display = "none";
}


add_content.onclick = function() {
    console.log('Clicked add note')
    renderEntry()
}

recieveData()