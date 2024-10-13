// "Structure de Quadrilatères (Square Structures)" by Vera Molnar, created in 1988.
// https://muda.co/src/img/vera_hero.gif

function setup() {
  createCanvas(600, 600);
  
  // Sfondo ROSSO (RGB = 219, 55, 71) preso con color pick dall'immagine
  background(219, 55, 71);
  
  // Stroke dei poligoni - BIANCO
  stroke(255);
  
  // Riempimento poligoni - Trasparente
  noFill();
  
  // Margine - 30 pixel
  let margin = 30;
  
  // Nuova dimensione della griglia (escluso il margine)
  let gridSize = (width - 2 * margin) / 6; // 6 righe e 6 colonne
  
  // Ciclo per disegnare la griglia 
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      
      // Variabile posizione per le celle (con margine)
      let xPos = margin + j * gridSize;
      let yPos = margin + i * gridSize;
      
      // Genera 4 punti casuali all'interno della cella
      let points = []; // Array che permette di memorizzare i punti che formano il poligono nella cella corrente
      for (let k = 0; k < 4; k++) {
        points.push(createVector(xPos + random(-7, gridSize +7), yPos + random(-7, gridSize +7)));
      }
      // i punti vengono generati casualmente dentro le caselle. 
      // La X del punto è definita in modo randomico in un range compreso tra 
      // xPos che definisce in che casella si trova e ho aggiunto 7 pixel da un lato e 7 dall'altro per far sì 
      // che i poligoni si sovrapponessero in un range limitato (14 pixel), pur mantenendo la griglia 
      
      // Funzione (realizzata con l'aiuto di Chat-GPT) che permette di ordinare i 4 punti del poligono 
      // in senso orario rispetto al centro per garantire la convessità del poligono
      points = sortPoints(points);
      
      // Disegna il poligono
      beginShape();
      for (let p of points) {
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
    }
  }
}

// Funzione per ordinare i punti in senso orario rispetto al centroide
function sortPoints(points) {
  // Calcola il centroide
  let centerX = 0;
  let centerY = 0;
  for (let p of points) {
    centerX += p.x;
    centerY += p.y;
  }
  centerX /= points.length;
  centerY /= points.length;

  // Ordina i punti in base all'angolo rispetto al centroide
  points.sort((a, b) => {
    let angleA = atan2(a.y - centerY, a.x - centerX);
    let angleB = atan2(b.y - centerY, b.x - centerX);
    return angleA - angleB;
  });
  
  return points;
}

// Con CSS ho fatto sì che il Canvas fosse sempre al centro della pagina in modo Responsive 
