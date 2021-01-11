"use scrict";
const inputArea = document.querySelector(".input-area");
const addBtn = document.querySelector(".add");
const clearAllBtn = document.querySelector(".clear-all");
const clearCompletedBtn = document.querySelector(".clear-completed");
const listItemsArea = document.querySelector(".items");
const listLi = document.querySelector(".list-item");
const listItems = document.querySelector(".list-items");
const listPlaceholder = document.querySelector(".list-text");
const listContainer = document.querySelector(".list");
let state;
if (JSON.parse(localStorage.getItem("data")) === null) state = [];
else state = JSON.parse(localStorage.getItem("data"));
// if(JSON.parse(localStorage.getItem("data")).length>0) ;
const getLocalStorage = function () {
  if (state.length === 0) return;
  listPlaceholder.remove();

  state.forEach((element) => {
    const html = `<li class="list-item"><i class="fas fa-chevron-right"></i><span class="list-items ${
      element.crossed ? "line-through" : ""
    }">${element.text}</span></li>
  `;
    listItemsArea.insertAdjacentHTML("beforeend", html);
  });
};
const addNewItem = function (e) {
  e.preventDefault();
  if (inputArea.value === "") return;
  listPlaceholder.remove();
  const html = `<li class="list-item"><i class="fas fa-chevron-right"></i><span class="list-items">${inputArea.value}</span></li>
  `;
  listItemsArea.insertAdjacentHTML("beforeend", html);
  const data = {};
  data.text = inputArea.value;
  data.crossed = false;
  state.push(data);

  inputArea.value = "";
  localStorage.setItem("data", JSON.stringify(state));
};
const crossItem = function (e) {
  if (e.target.classList.contains("list-items"))
    e.target.classList.add("line-through");
  state.forEach((data) => {
    if (data.text === e.target.textContent) {
      data.crossed = true;
    }
  });
  localStorage.setItem("data", JSON.stringify(state));
};
const clearAll = function () {
  listItemsArea.innerHTML = "";
  state = [];
  localStorage.clear();
};
const clearCompleted = function () {
  state = [];
  document.querySelectorAll(".list-items").forEach((element) => {
    if (element.classList.contains("line-through"))
      element.closest(".list-item").remove();
    else state.push({ text: element.textContent, crossed: false });
  });

  localStorage.setItem("data", JSON.stringify(state));
};
addBtn.addEventListener("click", addNewItem);
listItemsArea.addEventListener("click", crossItem);
clearAllBtn.addEventListener("click", clearAll);
clearCompletedBtn.addEventListener("click", clearCompleted);
localStorage.setItem("data", JSON.stringify(state));
getLocalStorage();
