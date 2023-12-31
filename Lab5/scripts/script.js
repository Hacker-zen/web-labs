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

