// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const textInputEl = document.querySelector(".text-input");
const fromInputEl = document.querySelector(".from-input");
const toInputEl = document.querySelector(".to-input");
const button = document.querySelector(".btn");
const ulEl = document.querySelector(".endor-list");
const appConfig = {
    databaseURL: "https://cartlist-ae597-default-rtdb.asia-southeast1.firebasedatabase.app/",
}
const app = initializeApp(appConfig);
const database = getDatabase(app);
const location = ref(database, "Endorsements");

function renderItem(item) {
    const [itemKey, itemValue] = item;
    // ulEl.innerHTML += `<li>${itemValue}</li>`;
    const { text, fromText, toText } = itemValue;
    const liEl = document.createElement("li");
    if(fromText){
        const fromSpanEl = document.createElement("b");
        fromSpanEl.textContent = `From ${fromText}`
        liEl.append(fromSpanEl)
    }
    liEl.innerHTML += text;
    if(toText){
        const toSpanEl = document.createElement("b");
        toSpanEl.textContent = `To ${toText}`
        liEl.append(toSpanEl)
    }
    liEl.addEventListener("dblclick", function () {
        let liLoaction = ref(database, `Endorsements/${itemKey}`);
        remove(liLoaction);
    });
    ulEl.appendChild(liEl);
}

function clearulEl() {
    ulEl.innerHTML = "";
}

onValue(location, function (snap) {
    if (snap.exists()) {
        const items = Object.entries(snap.val())
        clearulEl();
        items.forEach(item => {
            renderItem(item)
        })
    }
    else {
        ulEl.innerHTML = "No items here... yet"
    }
})

function pushEndor() {
    const text = textInputEl.value;
    const fromText = fromInputEl.value;
    const toText = toInputEl.value;
    if (text) {
        push(location, { text, fromText, toText });
        textInputEl.value = "";
        fromInputEl.value = ""
        toInputEl.value = "";
    }
}

button.addEventListener("click", function () {
    pushEndor();
})

textInputEl.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        pushEndor();
    }
})