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
    <div class='journal_header'>    
        <button onclick='editData(${item['id']})' id='edit_button'>Edit</button>
        <button onclick='deleteEntry(${item['id']})' id='delete_button'>Delete</button>
    </div>
    `
    entry.innerHTML += `
    <div class='journal_body'>
        <h2>${item['title']}</h2>
        <p>${item['text']}</p>
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


add_content.onclick = function() {
    console.log('Clicked add note')
    renderEntry()
}

recieveData()