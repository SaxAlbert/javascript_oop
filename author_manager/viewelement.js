/**
 * @callback ActivateCallback
 * @returns {void}
 */
import {hide, show} from "./gomszab.min.js"
class ViewElement{ //Ősosztály a megjelenítendő view osztálynak
    /**
     * @type {HTMLDivElement}
     */
    #div //példányosításkor létrehozunk egy divet, azt tároljuk benne
    /**
     * @type {string}
     */
    #id //privát tulajdonság az osztály példányának
    /**
     * @type {ActivateCallback}
     */
    #activateCallback //akkor fut le, amikor megjelenik az elem a képernyőn (opcionális lásd: activate függvény)

    get div(){ //getter definiálása a divnek
        return this.#div
    }

    get id(){ //getter az azonosítónak
        return this.#id //(navigációban használatos)
    }
    /**
     * @param {ActivateCallback} value 
     */
    set activateCallback(value) { //setter az activateCallbacknek
        this.#activateCallback=value //beállítja az activateCallbacknek a bemeneti paramétert
    }
    /**
     * 
     * @param {string} id 
     */
    constructor(id){ //konstruktorral
        this.#id=id //azonosító beállítása
        this.#div=document.createElement('div')// div létrehozása és a div privát tulajdonság beállítása
        this.#div.id=id // adiv azonosítójának beállítása
    }
    /**
     * 
     * @param {HTMLElement} parent 
     * @returns {void}
     */
    appendTo(parent){ //definiálunk egy függvényt a példának, a bemeneti paraméter egy HTML elem
        parent.appendChild(this.#div) //hozzácsattoljuk a div tulajdonságot (lásd: konstruktor)
    }
    /**
     * 
     * @param {string} id 
     * @returns {void}
     */
    activate(id){ //függvényt definiálunk a példányoknak
        if(this.#id===id){ //összehasonlítjuk a bemeneti id paramétert az id tulajdonsággal
            show(this.#div) //a divtől elveszi a hidden css osztályt
            if(this.#activateCallback){ //ha van activateCallback akkor meghívjuk
                this.#activateCallback()
            }
        }
        else{ //máskülönben hozzáadjuk a hidden css osztályt
            hide(this.#div)
        }
    }
}
export {ViewElement} //exportáljuk