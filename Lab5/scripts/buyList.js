document.addEventListener('DOMContentLoaded', function () {
     if(document.location.href.includes('buyList')){
          loadItems();
     }
 });

 const form = document.getElementById("buyListForm");
 form.addEventListener('submit', (event) => {
    event.preventDefault();
    addItem();
 });


 function addItem() {
     var itemInput = document.getElementById('itemInput');
     var itemText = itemInput.value.trim();

     if (itemText === '') {
         alert('Please enter an item.');
         return;
     }

     var items = getItems();
     items.push(itemText);
     saveItems(items);
     renderItems();
     itemInput.value = '';
     return false;
 }

 function removeItem(index) {
     var items = getItems();
     items.splice(index, 1);
     saveItems(items);
     renderItems();
 }

 function getItems() {
     var items = localStorage.getItem('items');
     return items ? JSON.parse(items) : [];
 }

 function saveItems(items) {
     localStorage.setItem('items', JSON.stringify(items));
 }

 function renderItems() {
     var items = getItems();
     var itemList = document.getElementById('buyList');
     var template = document.getElementById('buyListTemplate');
     itemList.innerHTML = '';


     items.forEach(function (item, index) {
         var clone = template.content.cloneNode(true);
         clone.querySelector('span').textContent = `${index + 1}. ${item}`;
         clone.querySelector('button').addEventListener('click', function(){
            removeItem(index);
         })
         itemList.appendChild(clone);
     });
 }

 function loadItems() {
     renderItems();
 }

 
