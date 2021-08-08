export default class Item{
    static lastId = 0; //Variável de classe
    constructor(text){
        /* Método chamado toda vez que a classe for instânciada */
        this.id = Item.lastId++;
        this.text = text;
        this.done = false;
    }
}