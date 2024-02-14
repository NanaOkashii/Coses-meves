 /*let verdUll = "hsb(120,8,89)";
let colCarn = "hsb(18,9,99)";
let colContorn = "hsb(24,70,29)"; 

Al principi vaig intentar utilitzar colors HSB, 
però no vaig aconseguir trobar com declarar variables 
i aplicar-les, així que vaig desistir.

Interaccions aconseguides:
1-Canviar el color de les ulleres i la roba amb l'slider.
2-Pujar i baixar les seies cada cop que es fa clic amb el mouse.
3-Els ulls segueixen el cursor.
4-Al prémer qualsevol tecla s'obre la boca, i al deixar de prémer es tanca.
5-Quan el cursor està dins la cara, les galtes s'enrogeixen. El cursor canvia de fletxa a mà.

Interaccions no aconseguides (però intentades):
1-Obrir i tancar els ulls.
2-Obrir la boca només prement una tecla concreta, tancar-la al deixar-la anar.
3-Canviar el color dels llavis fent-hi clic amb el mouse o passant-hi pers obre.
4-Canviar la forma de les ulleres (de cercle a quadrat) al fer clic.

Interaccions no intentades però imaginades:
1-Canviar la mida d'alguns elements (ulls, ulleres) amb un segon slider (interacció paramètrica).
*/

//Llistat de colors
let verdUll = "rgb(209,228,209)";
let colCarn = "rgb(254,237,230)";
let colContorn = "rgb(70,38,23)";
let colLlavis = "rgb(249,183,184)";
let colCabell = "rgb(163,112,85)";
let colSeies = "rgb(107,78,62)";
let colIntOrella = "rgb(223,190,171)";
let colVidres = "rgba(255,255,255,0.5)";
let colBrillo = "rgba(255,255,255,0.8)";
let colFons = "rgb(219,245,248)";
let colGaltes = "rgba(254,181,198,0.3)";


//Altres variables
posX = 174;
posY = 369;
dC = 400; //diàmetre de la cara
dU = 90; //diàmetre de l'iris
dP = 40; //diàmetre de la pupil·la
llaviInfY = 514; //coordenada Y del llavi inferior en posició boca tancada
xMap1 = 0; //he posat xMap1 i no xMap per si havia de declarar una variable per cada ull, 
//però per no complicar-me més, com que he vist que funciona, ho he deixat així.
let sliderRed;
let seiesUp = false;

function setup() {
createCanvas(600,800);
//colorMode(HSB,360,100,100);
sliderRed = createSlider(0, 255, 127); // mínim, máxim, valor inicial
sliderRed.position(150, 80);
sliderRed.style('width', '300px');  
}

function draw() {
stroke(colContorn);
background(colFons);

//Roba
let r = sliderRed.value(); 
fill(r,176,96);
strokeWeight(10);
ellipse(width/2,576,250,300);     
  
//Melena
fill(colCabell);
strokeWeight(10);
beginShape();
line(107,337,488,337);
vertex(488,337);
bezierVertex(488,337,490,470,536,594);
bezierVertex(536,594,302,547,95,594);
bezierVertex(95,594,196,425,107,337);
endShape();
   
//Coll
fill(colCarn);
stroke(colIntOrella);
strokeWeight(10);
ellipse(width/2,576,200,200);      

//Cara
fill (colCarn);
stroke(colIntOrella);
strokeWeight(10);
circle(width/2,height/2,dC);

//Galtes
let circleDist = dist(mouseX, mouseY, width/2, height/2);
if (circleDist < dC/2){
cursor(HAND);
galtes();
} else {
cursor(ARROW);
}

//Ulls    
stroke(colContorn);  
let numUlls = 2;
for (let i = 0; i < numUlls; i++){
let sep = dC / numUlls-dP;
ullSize = sep;
ull(ullSize,i*sep+ullSize,height/2-dP);
}
             
//Boca
boca()  
if(keyIsPressed){
  llaviInfY = 530;
} else {
  llaviInfY = 514;
}
 
//Orella
fill(colCarn);
stroke(colIntOrella);
strokeWeight(10);
arc(440,421,100,100,PI+HALF_PI,HALF_PI);
fill(colIntOrella);
strokeWeight(1);
arc(440,421,60,60,PI+HALF_PI,HALF_PI);

//Cabell (part superior)
//Peça Esquerra
stroke(colContorn);
strokeWeight(10);
fill(colCabell);
beginShape();
vertex(107,337);
bezierVertex(107,337,118,200,284,200);
bezierVertex(284,200,229,278,107,337);
endShape();
//Peça Dreta
beginShape();
vertex(284,200);
bezierVertex(284,200,520,157,502,425);
bezierVertex(502,425,283,415,284,200);
endShape();

//Seies
if (seiesUp) {
let numSeies = 2;
for (let i = 0; i < numSeies; i++){
  let sep = dC / numSeies-dP;
  seiaSize = sep;
  seia(seiaSize,i*sep+seiaSize,height/2-dP-50); 
  }
  } else {
  let numSeies = 2;
  for (let i = 0; i < numSeies; i++){
  let sep = dC / numSeies-dP;
  seiaSize = sep;
  seia(seiaSize,i*sep+seiaSize,height/2-dP); 
  }
}
  
//Ulleres
let numVidres = 2;
for (let i = 0; i < numVidres; i++){
  let sep = dC / numVidres-dP;
  vidreSize = sep;
  ulleres(vidreSize,i*sep+vidreSize,height/2-dP);
}
 
//Nas
stroke(colIntOrella);
strokeWeight(5);
fill(colCarn);
beginShape();
vertex(238,374);
bezierVertex(238,374,165,400,185,465);
bezierVertex(185,465,210,484,249,465);
endShape();
  
}


function ull(size, posX, posY){
//Fons de l'ull
posY += 10;
strokeWeight(1);
fill(255);
/* map(valor a mapejar, min rang original(en aquest cas 
és el vèrtex esquerre del fons de l'ull:posX-70,posY), 
max rang original(és l'amplada del fons de l'ull més el radi de l'iris), 
min rang desitjat, max rang desitjat)*/  
xMap1 = map(mouseX,posX-70+dU*0.5,posX+70+dU*0.5,posX-70+dU*0.5,posX-20+dU*0.5,true);
beginShape();
vertex(posX-70,posY);
bezierVertex(posX-70,posY,posX,posY-100,posX+70,posY);
vertex(posX+70,posY);
bezierVertex(posX+70,posY,posX,posY+100,posX-70,posY);
endShape();
//Iris
fill(verdUll);
circle(xMap1,posY,dU);
//Pupil·la
fill(colContorn);
circle(xMap1,posY,dP);  
}

function galtes(){
fill(colGaltes);
noStroke();
ellipse(165,456,90,30);
ellipse(320,456,90,30);
}

function seia(size, posX, posY){
noFill();
stroke(colSeies);
strokeWeight(15);
beginShape();
vertex(posX-70,posY-20);
bezierVertex(posX-70,posY-20,posX,posY-100,posX+70,posY-20);
endShape();
}

function ulleres(size, posX, posY){
let r = sliderRed.value(); 
stroke(r,176,96);  
strokeWeight(16);
fill(colVidres);
ellipse(posX,posY,150,150);
noStroke();
fill(colBrillo);
circle(posX+30,posY-10,50)
fill(r,176,96);  
triangle(396,342,448,352,396,362);
}

function boca(){
  //Llavi superior
  noStroke();
  fill(colLlavis);
  arc(222,514,dU/1.3,dU/2,PI,TWO_PI,CHORD);//CHORD serveix per tancar la forma
  //Llavi inferior
  beginShape();
  vertex(170,llaviInfY);
  bezierVertex(170,llaviInfY,223,llaviInfY+76,280,llaviInfY);
  line(280,llaviInfY,170,llaviInfY);
  endShape();  
}

/*Amb aquesta funció passo el valor de "seiesUp" a "true" 
  i a "false" alternativament, cada cop que faig click amb el mouse. 
  Així les seies pugen i baixen*/
function mousePressed() { 
  seiesUp = !seiesUp;
}

/* Nota: he utilitzat aquesta funció serveix per trobar 
les coordenades dins del llenç:
function mousePressed() { 
  console.log(mouseX + "," + mouseY);
}*/