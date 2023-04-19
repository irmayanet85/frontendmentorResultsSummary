/*jshint esversion: 6 */

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "./assets/data.json", true);


function average(data){

    let average = document.querySelector('#average');

    const sum = data.reduce((acumulador, element) => acumulador + element.score, 0);
    const avg = sum / data.length;
    average.innerHTML = Math.round(avg);

}

function loadData (data){
    let template = document.querySelector('#action-aside');

    const elementsHtml = data.map(element => {
       return `<div class="element-aside">
        <div class="left">
          <img src=${element.icon} alt="">
          <span>${element.category}</span>
        </div>
        <div class="right">
          <span class="number-before">${element.score} </span>
          <span class="number-after">/ 100</span>
        </div>
      </div>`;

      
      });
      template.innerHTML = elementsHtml.join('');
}


xhttp.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status === 200) {
      try {
        const jsonStr = xhttp.responseText;
        const jsonData = JSON.parse(jsonStr);
        loadData(jsonData);
        average(jsonData);

        
      } catch (error) {
        console.error('Error al analizar el archivo JSON', error);
      }
    } else {
      console.error('Error al cargar el archivo', xhttp.statusText);
    }
  }
};

xhttp.send();

  
