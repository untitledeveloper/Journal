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

    div.style.display = "none"
    add_content.style.display = "block"

    entry_title.value = ""
    entry_journal.value = ""

    return recieveData()
}

const getData = async () => {
    const result = await fetch('/api/db', {
      method: 'GET',
    });
    const json = await result.json();
    return json;
  };

const listData = (item) => {
    console.log(item)
    var entry = document.createElement("div");
    entry.className = "card journal_card";
    entry.id = item['id'];
    entry.innerHTML = `
    <div class='journal_header'>    
        <button onclick='editData()' id='edit_button'>Edit</button>
        <button onclick='deleteData()' id='delete_button'>Delete</button>
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

async function recieveData() {
    console.log("Getting data")
    const response = await getData();
    return response.forEach((item) => listData(item));
}

function editData() {
    console.log("edit data")
}

function deleteData() {
    console.log("delete data")
}

add_content.onclick = function() {
    console.log('Clicked add note')
    renderEntry()
}

recieveData()