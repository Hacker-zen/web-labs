(function(){
     window.addEventListener('load', function(){
          var loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
          console.log('Время загрузки страницы: ' + loadTime + ' миллисекунд');
          const p = document.getElementById('pageLoad');
          p.innerHTML = "Page load time in Javascript: " + loadTime + " миллисекунд";
     });
})();


document.addEventListener('DOMContentLoaded', function(){
     var currentPage = document.location.href;
     console.log(currentPage)
     var menuLinks = document.querySelectorAll('.navchoice a');

     menuLinks.forEach(function(link){
          if (currentPage.includes(link)){
               link.classList.add('active');
          }
     })
})

document.addEventListener('DOMContentLoaded', function () {
     if(document.location.href.includes('buyList')){
          loadItems();
     }
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
     itemList.innerHTML = '';

     items.forEach(function (item, index) {
         var li = document.createElement('li');
         li.innerHTML = `<span>${index + 1}. ${item}</span><button onclick="removeItem(${index})">X</button>`;
         itemList.appendChild(li);
     });
 }

 function loadItems() {
     renderItems();
 }