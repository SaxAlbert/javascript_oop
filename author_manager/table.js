import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewelement.js";

class TableView extends ViewElement{ // táblázatot tartalmazó viewelement definiálása   ViewElementvől leszármazva
    /**
     * @type {AuthorManager}
     */
    #manager //privát tulajdonság a managernek
    /**
     * @type {HTMLTableSectionElement}
     */
    #tbody //privát tulajdonság a táblázat törzsének



    /**
     * 
     * @param {string} id 
     * @param {string[]} headerArray 
     * @param {AuthorManager} manager 
     */
    constructor(id, headerArray, manager){
        super(id) //szülőosztály konstruktorának meghívása
        this.#manager=manager // a manager értéke a bemeneti példány
        const table=document.createElement('table') //létrehozunk egy táblázatot
        this.div.appendChild(table) //hozzácsatoljuk a táblázatot a divhez
        const thead=createTableHeader(headerArray) //létrehozzuk a táblázat fejlécét a string tömb alapján
        table.appendChild(thead) //hozzácsatoljuk a theadet a divhez
        this.#tbody=document.createElement('tbody') //létrehozzuk a táblázat bodyját a string tömb alapján
        table.appendChild(this.#tbody) //hozzácsatoljuk a tbody a divhez
        this.#manager.tableCallback = (authorList)=>{ // definiáljuk a manager tablecallback-jét
            if(authorList.length==0){ //ha a lista üres
                const tr=document.createElement("tr")//létrehozunk egy sor elemet
                this.#tbody.appendChild(tr)//hozzácsattoljuk a tbody-hoz
                const nincssor=createTableCell(tr,"Nincs megjelenítendő sor") //létrehozunk egy cellát tartalommal és hozzácsattoljuk a sorhoz
                nincssor.colSpan=3 //kiterjesztjük 3 oszlop szélességűre
            }
            //lehetséges else ág
            for(const author of authorList){ //végigiterálunk az authorlistán
                const tr=document.createElement('tr') //létrehozunk egy sort
                this.#tbody.appendChild(tr) // hozzácsattoluk a tbodyhoz
                createTableCell(tr,author.name) //létrehozunk egy cellát az author nevével
                createTableCell(tr,author.work)  //létrehozunk egy cellát a workjével
                createTableCell(tr,author.concept)  //létrehozunk egy cellát conceptjével
            }
        }
        this.activateCallback=()=>{ //definiáljuk az activateCallback-et
            this.#tbody.innerHTML="" // töröljük a tbody tartalmát
            this.#manager.getAllElement() //meghívjuk a manager getAllElementjét (ami meghívja a tablecallback-et lasd: AuthorManager.getAllElement)
        }
    }
}
export {TableView} //exportáljuk