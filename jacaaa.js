if (document.body.className == "channel index-action styleguide"){
  
var i,y , u, j;


/* *****************  PALABRAS CLAVES******************** */

function creaPalClave (texto){
  sppan = document.createElement('SPAN');
  sppan.textContent = texto;
  barra = document.createElement('BR');
//  idBoton = document.createAttribute('CLASS');
//  idBoton.value = 'botoncerrar';
//  boton.setAttributeNode(idBoton);
  document.body.appendChild(sppan);
  document.body.appendChild(barra);
  }


palClaves = [
  
'Look at',  
'Address Verification',
'Youtube Videos', 'Youtube Video',
//"Extract Amazon Sales Rank For Paperback/Hardcover Books",
//'Document Recognition', 
//'New Instructions - Rate Content Of Animated Gifs' , 
"Entity Highlighting",
"Find Google Place Id For A Busines",
"Help Us Categorize Images Of Food",
"Help Us Find The Official Website Of Businesses",
"Motion Detection In Text",
//"Categorization Of Real And Fake Images",
"Company Website Review",

];

for (i in palClaves){
  titulo_lista_baneado = document.createElement("P");
  titulo_lista_baneado.textContent = "Lista de Baneados";
  document.body.appendChild(titulo_lista_baneado);
  
  texto_span = creaPalClave(palClaves[i]);
  
}


/* *****************  PALABRAS BANEADAS ******************** */

palBaneadas = ["Which Product", 'Imagen Comparision', "Find Products In", 'Transcribe Information From',];


/* ********************************************************* */


function aviso (mensaje, cuerpo, enlace){
  var notificacion = new Notification (mensaje, {body: cuerpo});
  notificacion.onclick = function (event) {
    event.preventDefault();
    window.open(enlace, '_black');
  }
}



listaFinal = [];
/*var audio = new Audio ('https://www.mboxdrive.com/messenger_tono_mensaje.mp3');
audio.load();*/

listaTarea = document.querySelectorAll("tr");

for (i=1; i<listaTarea.length;i++) {
  listaPro = [];
  numero = listaTarea[i].childNodes[0].textContent;
  listaPro.push(numero);
  nombre = listaTarea[i].childNodes[1].textContent;
  listaPro.push(nombre);
  pago = listaTarea[i].childNodes[3].textContent;
  listaPro.push(pago);
  numeroTa = listaTarea[i].childNodes[4].textContent;
  listaPro.push(numeroTa);
  enlace = listaTarea[i].childNodes[1].childNodes[0].href;
  listaPro.push(enlace);
  
  
  listaFinal.push(listaPro);


  
}



//Seccion de Notificaciones

for (i in palClaves) {
  for (y in listaFinal) {
    if (listaFinal[y][1].includes(palClaves[i])){
      aviso ('HAY TAREA', listaFinal[y][1]+"\n"+listaFinal[y][3]+' tareas'+"\n"+listaFinal[y][2] , listaFinal[y][4] );
//       audio.play();

    }
  }
}


// Seccion de Guardado de lista

listaIdsN = [];
  for (i in listaFinal){
    listaIdsN.push(listaFinal[i][0]);
  }


// Guardar listaids sino existe
  
imprime = true;
if (localStorage.getItem ("listaTareas")==null){
  localStorage.setItem ("listaTareas", listaIdsN);
  }


//Procesa la listaids si existe
else {
  listaIdsA = localStorage.getItem ("listaTareas").split(',');
  for (i in listaIdsN){
    if (listaIdsA.includes(listaIdsN[i])==false){
      
      
      for (y in palBaneadas){
        if (listaFinal[i][1].includes(palBaneadas[y])){
          imprime= false; 
          break;
        }
      }
      
      
      if (imprime){
        aviso ("Nueva Tarea",listaFinal[i][1]+"\n"+listaFinal[i][3]+' tareas'+"\n"+listaFinal[i][2] , listaFinal[i][4] );
//        audio.play();
      }
      listaIdsA.push(listaIdsN[i]);
      imprime = true;
    }
  }
  localStorage.setItem ("listaTareas", listaIdsA);
  

}

//recargar pagina index de trabajos

setTimeout(function() {location.reload()}, 15*1000);


//crea boton equis

listaIdBan = [];
if (localStorage.getItem("listaIdBan")==null){
  localStorage.setItem('listaIdBan', listaIdBan);
}
else {
  listaIdBan = localStorage.getItem('listaIdBan').split(',');
}

function creaBoton () {
  boton = document.createElement('SPAN');
  boton.textContent = "X";
  idBoton = document.createAttribute('CLASS');
  idBoton.value = 'botoncerrar';
  boton.setAttributeNode(idBoton);
  return boton;
}

for (i in listaIdBan){
  for (j=1;j<listaTarea.length;j++){
    if (listaIdBan[i]==listaTarea[j].childNodes[0].textContent){
      listaTarea[j].style.display = "none";
    }
  }
}



for (i=0;i<listaTarea.length;i++){
  nTarea = listaTarea[i];
  boton=creaBoton();
  boton.onclick=function(){this.parentElement.style.display="none"; listaIdBan.push(this.parentElement.childNodes[0].textContent);localStorage.setItem('listaIdBan', listaIdBan);};
  listaTarea[i].appendChild(boton);
}






}

// Pagina de espera

if (document.body.className == "task_work"){
  if (document.querySelector("head > title").textContent=="Create Task Work — Tasks by Figure Eight"){
  audio.play();
  }
  
  else{
    setTimeout(function() {location.reload()}, 3*1000);
  }
}










