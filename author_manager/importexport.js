import { ViewElement } from "./viewelement.js";
import { AuthorManager } from "./manager.js";
class ImportExport extends ViewElement{ //deiniáljuk az importexport osztályt, leszármazik a ViewElementből
    /**
     * @type {AuthorManager}
     */
    #manager //privát manager tulajdonság definiálása
    /**
     * 
     * @param {string} id 
     * @param {AuthorManager} manager 
     */
    constructor(id, manager){ //konstruktor definiálása
        super(id) //szülűosztály konstruktorának meghívása
        this.#manager=manager //manager tulajdonságának az érték megadása
        

        const fileInput=document.createElement('input')
        fileInput.type='file'
        this.div.appendChild(fileInput)
        this.#manager.ImportResultCallback=(message)=>{ //importResultCallback függvény definiálása
            const resultDiv=document.createElement('div')
            this.div.appendChild(resultDiv) //resultDiv hozzácsattolása a divhez
            resultDiv.innerText=message //reslutDiv tartalmának beállítása
            setTimeout(()=>{ //settimeout hívása
            resultDiv.innerText='' //resultDiv tartalmának törlése
            },1500)
        }
        fileInput.addEventListener('change', (e)=>{//input change eseméényre való feliratkozás
            const file=e.target.files[0]//elkérjük az esemény targetjének a file tulajdonságából az első elemet
            const reader=new FileReader() //példányosítjuk a FileReader osztályt
            reader.readAsText(file,'UTF-8') //elkezdjük beolvasni a fájlt a memóriába, ha sikeres akkor fut le az onloadban megadott callback
            reader.onload=()=>{// feliratkozunk a reader onload eseményre
                /**
                 * @type {import("./index.js").AuthorType[]}
                 */
                const result=[] //létrehozunk egy result tömböt üres tömbként
                const fileContent=reader.result //elkérjük a fileReader példány result tulajdonságát
                const fileContentLines=fileContent.split('\n') //szétválasztjuk a fájl tartalmát soronként
                for(const line of fileContentLines){//végigiterálunk a sorokon
                    const data=line.split(';')// szétválasztjuk a sorokat ; ként
                    /**
                     * @type {import("./index.js").AuthorType}
                     */
                    const authorType={ //deklarálunk egy author típusú objektumot
                        author: data[0],//ahol az author a sor első pontosvesszőjéig tartó string
                        work: data[1],//ahol a work a sor második pontosvesszőjéig tartó string
                        concept: data[2],//ahol a concept a sor harmadik pontosvesszőjéig tartó string
                    }
                    result.push(authorType) //hozzáadjuk az objektumot a result tömbhöz
                    
                }
                this.#manager.addElementList(result) //meghívjuk a result tömbbel az AuthorManager.addElementList metódusát
            }
        })
        const exportButton=document.createElement('button') //létrehozunk egy gombot
        exportButton.innerText="Export" //megadjuk a gomb szövegét
        this.div.appendChild(exportButton) //hozzáfűzzük a divhez a gombot
        exportButton.addEventListener('click',()=>{ //feliratkozunk a gomb klikk eseményére
            const a=document.createElement('a') //létrehozunk egy linket
            const fileContent=this.#manager.getExportString()// elkérjük az authorok string reprezentációját az AuthorManagertől
            const file=new Blob([fileContent])// példányosítunk egy Blobot, amelynek megadjuk egy tömböt ami tartalmazza az authorok string reprezentációjaát
            const fileURL=URL.createObjectURL(file)//létrehozunk egy url-t a Blob alapján
            a.href=fileURL //megadjuk a link href-jének a létrehozott Blob url-jét
            a.download='export.csv'// megadjuk a letöltendő fájl nevét
            a.click()// clickelünk a linkre
            URL.revokeObjectURL(a.href)// visszavonjuk a blob linkjének az url-jét
        })
    }
}
export {ImportExport} //exportáljuk