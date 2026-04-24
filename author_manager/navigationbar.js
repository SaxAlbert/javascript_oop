import { ViewElement } from "./viewelement.js";
import { createRadioButton } from "./gomszab.min.js";

class Navigationbar extends ViewElement{ //navigationBar osztály definíciója
    /**
     * @type {ViewElement[]}
     */
    #viewElementList //a privát tulajdonság ami tartalmazza a megjelenítendő viewelement leszármazottakat (táblázat, form, import/export)

    constructor(){ //konstruktor definíció
        super('navbar') //meghívjuk a szülőosztály konstruktorát
        this.#viewElementList=[] //inicializáljuk a viewelementlistet egy üres tömbbel
        this.div.addEventListener('change',(e)=>{ //feliratkozunk a div change eseményére (mivel a div rádiógombokat fog tartalmazni ezért tudjuk figyelni a divnél, hogy melyik rádiógomb van kijelölve)
            const radioButtonValue=e.target.value //elkérjuk a target value értékét
            this.activate(radioButtonValue) //meghívjuk az activate függvényt a kiválasztott rádiógomb értékével (a viewelement azonosítói lehetnek lásd: addViewElement)
        })
    }
    /**
     * 
     * @param {string} label 
     * @param {ViewElement} viewElement 
     */
    addViewElement(label, viewElement){ //naviagtionbar példányának definiál egy függvényt
        this.#viewElementList.push(viewElement) //bemeneti viewelementet hozzáadjuk a viewElementListhez
        const div = createRadioButton({id: viewElement.id, name: this.id, label}) //csinálunk egy rádiógombot, amely az azonosítója a viewelement azonoítója, a labelje a függvény bemeneti paramétere, 
        // a name a navigationbar azonosítója. Azért mert a rádiógomboknál ha azonos a name tulajdonság csak egy választható ki
        this.div.appendChild(div) // hozzáfűzzük a divhez a rádiógomb kreálás visszatérési értéket (this.div lásd: ViewElement osztály definíció)
    }
    /**
     * @override
     * @param {string} value 
     */
    activate(value){ //a szülő osztály definiál egy activate függvényt (lásd ViewElement.activate) de a navigáció bár más logikát kell tartalmozzon
        for(const viewElement of this.#viewElementList){ //végig iteráluk a vieElementListen
            viewElement.activate(value) //meghívjuk az activate függvényét minden viewElementnek (lásd: ViewElement.activate)
        }
        this.div.querySelector(`#${value}`).checked=true //a diven belül lekérjuk a bementi paraméterrel megegyező id-jú elemet és kijelöljuk
    }
}
export {Navigationbar} // exportáljuk