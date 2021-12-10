 //address of published google sheets in CSV format
 var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMJLV4VoAsXCh_U6YQ2tvK4sAzMih6MmgUXMLkvWgOQuIbomlt-0kfkvf-OMxnoy0Jpk48DVg1Ci_T/pub?output=csv';

 window.addEventListener('DOMContentLoaded', init)
 /* window.addEventListener('DOMContentLoaded', shuffle)
 setTimeout(shuffle, 3000);> */

 function init() {
   Papa.parse(public_spreadsheet_url, {
     download: true,
     complete: function(result) {
       console.log(result);
       data = result.data;
       renderData(data)
     }
   });
 }

 data = undefined;
 let display = document.getElementById("card-stack");

 function renderData(data) {

   for (let i = 1; i < data.length; i++) {
     let card = document.createElement("div");
     card.className = 'card'
     let html = ''
     for (let j = 0; j < data[i].length; j++) {
       if (j === 0) {
         if (data[i][j] === '') return;
         html += `${data[i][j]}`
       }
       card.innerHTML = html;
       display.appendChild(card);
     }

   }
 }

 let stack = document.querySelector(".stack");

 [...stack.children].reverse().forEach(i => stack.append(i));

 stack.addEventListener("click", swap)

 function swap(e) {
   let card = document.querySelector(".card:last-child");
   if (e.target !== card) return;
   card.style.animation = "swap 300ms forwards";

   setTimeout(() => {
     card.style.animation = "";
     stack.prepend(card);
   }, 300);
 }

 function shuffle() {
   $(".stack").each(function() {
     var divs = $(this).find('div');
     for (var i = 0; i < divs.length; i++) $(divs[i]).remove();
     //the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
     var i = divs.length;
     if (i == 0) return false;
     while (--i) {
       var j = Math.floor(Math.random() * (i + 1));
       var tempi = divs[i];
       var tempj = divs[j];
       divs[i] = tempj;
       divs[j] = tempi;
     }
     for (var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);
   });
 }
