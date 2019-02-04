const defaultImage = "img/card.png";
class Card {
  constructor(id, image) {
    this.image = image;
    this.id = id;
    this.genNode();
  }

  // Genera el nodo html de la carta
  genNode() {
    const card = $('<div class="card"></div>');
    const img = $('<img class="card-img" />');
    img.attr("src", defaultImage);
    card.append(img);
    this.domNode = card; // El nodo contenedor de la carta
    this.imgNode = img; // El nodo img de la carta, tiene la imagen
  }

  // Muestra la imagen de la carta
  show() {
    console.log("showing", this.image);
    const self = this;
    this.imgNode.fadeOut("fast", function() {
      console.log(this);
      self.imgNode.attr("src", self.image);
      self.imgNode.fadeIn("fast");
      console.log(self.imgNode);
    });
  }

  // Oculta la imagen de la carta
  hide() {
    console.log("hiding", this.image);
    const self = this;
    this.imgNode.delay(600).fadeOut("fast", function() {
      self.imgNode.attr("src", defaultImage);
      self.imgNode.fadeIn("fast");
    });
  }

  // Retorna true si la carta está mostrando la imagen de la carta
  isShown() {
    return this.imgNode.attr("src") === this.image;
  }

  // Configura el onclick de la carta con una función dada
  setClicker(cb) {
    this.domNode.click(this, cb);
  }
}
