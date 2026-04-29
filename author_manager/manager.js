/**
 * @callback TableCallback
 * @param {Author[]} authorList
 * @returns {void}
 * 
 * @callback AddElementResultCallback
 * @param {string} message
 * @returns {void}
 * 
 * 
 * @callback ImportResultCallback
 * @param {string} message
 * @returns {void}
 * 
 */
class AuthorManager{ //definiáljuk az AuthorManager osztályt

    /**
     * @type {Author[]}
     */
    #authorList //definiálunk egy privát AuthorList tulajdonságot
    /**
     * @type {TableCallback}
     */
    #tableCallback //definiálunk egy privát tableCallback függvényt
    /**
     * @type {AddElementResultCallback}
     */
    #addElementResultCallback //definiálunk egy privát addelementresult tulajdonságot

    /**
     * @type {ImportResultCallback}
     */
    #importResultCallback //definiálunk egy privát importResultCallback tulajdonságot

    set addElementResultCallback(value){ //definiálunk egy settert az addElementResultCallback-nek (lásd: addElement)
        this.#addElementResultCallback=value // értéket adunk a privát tulajdonságnak
    }
    /**
     * @param {ImportResultCallback} value
     */
    set ImportResultCallback(value){ //definiálunk egy settert az importResultCallbacknek (lásd: addElement)
        return this.#importResultCallback=value //értéket adunk a callbacknek
    }
    /**
     * @param {TableCallback} values
     */
    set tableCallback(value){ //definiálunk egy settert a tableCallbacknek (hívjuk a Table-be)
        this.#tableCallback=value // értéket adunk a privát tulajdonságnak
    }

    constructor(){ // definiálunk egy konstruktort
        this.#authorList=[] //inicializáljuk az authorListet üres tömbbel
    }

    /**
     * 
     * @param {import(".").AuthorType} element 
     */
    addElement(element){ //definiáljuk az addElement függvényt
        const author= new Author() //példányosítunk egy authortt
        author.id=this.#authorList.length //beállítjuk az id tulajdonság értékét a következő elérhatő indexre
        author.name=element.author //beállítjuk a name tulajdonságot
        author.work=element.work //beállítjuk a work tulajdonságot
        author.concept=element.concept //beállítjuk a concept tulajdonságot
        if(author.validate()){ //meghívjuk a validate függvényét az author példánynak (lásd: Author.validate)
            this.#authorList.push(author) //ha valid hozzáadjuk az elemet
            this.#addElementResultCallback("Sikeres elemfelvétel") //meghívjuk az addElementResultCallbacket
        }
        else{//más esetben
            this.#addElementResultCallback("Nem volt sikeres az elemfelvétel") //meghívjuk az addElementResultCallbacket
        }
        
    }
    /**
     * @returns {void}
     */
    getAllElement(){ //definiáljuk a getAllElement függvényt
        this.#tableCallback(this.#authorList) //meghívjuk a tableCallback callbacket (implementáció: lásd: Table)
    }
    /**
     * @returns {string}
     */
    getExportString(){// definiáljuk a getExportString függvényt
        const result=[]// definiálunk egy üres tömböt
        for(const author of this.#authorList){ //végigiterálunk az author tulajdonság értékein
            result.push(`${author.name};${author.work};${author.concept}`) //hozzáadjuk a tömbhöz a string reprezentációját az entitásnak
        }
        return result.join("\n") //joinoljuk egy sortörés karakterrel a tömb string elemeit
    }
    /**
     * 
     * @param {import(".").AuthorType[]} elementList 
     */
    addElementList(elementList){ //definiáljuk az addElementlist függvényt
        for(const elem of elementList){ //végigiterálunk az element listán
            const author=new Author() //példányosítjuk az authort
            author.id=this.#authorList.length //beállítjuk az id tulajdonság értékét a következő elérhatő indexre
            author.name=elem.author //beállítjuk a name tulajdonságot
            author.work=elem.work //beállítjuk a work tulajdonságot
            author.concept=elem.concept //beállítjuk a concept tulajdonságot
            if(author.validate()){ //meghívjuk a validate függvényét az author példánynak (lásd: Author.valid)
                this.#authorList.push(author) //ha valid hozzáadjuk az authorlistához
                this.#importResultCallback("Sikeres importálás") //meghívjuk az importResultCallback-et 
            }
            else{
                this.#importResultCallback("Nem volt sikeres az importálás") //meghívjuk az importResultCallback-et
                break; //megállítjuk a ciklus futását új elemet nem fogunk vizsgálni hogy megfelel-e
            }
        }
    }

}

class Author{  //definiálunk egy Author entitás osztályt
    /**
     * @type {string}
     */
    #id //definiálunk egy id privát tulajdonságot
    /**
     * @type {string}
     */
    #name //definiálunk egy name privát tulajdonságot
    /**
     * @type {string}
     */
    #work //definiálunk egy work privát tulajdonságot
    /**
     * @type {string}
     */
    #concept //definiálunk egy concept privát tulajdonságot

    get id(){ //definiálunk gettert az azonosítónak
        return this.#id //visszatérünk a privát id tulajdonsággal 
    }

    get name(){ //definiálunk gettert a namenek
        return this.#name //visszatérünk a privát name tulajdonsággal
    }

    get work(){ //definiálunk gettert a worknek
        return this.#work //visszatérünk a privát work tulajdonsággal
    }

    get concept(){ //definiálunk gettert a concept
        return this.#concept //visszatérünk a privát concpet tulajdonsággal
    }

    set id(value){ //definiálunk egy settert az azonosítónak
        this.#id=value //beállítjuk az id-t
    }

    set name(value){ //definiálunk egy settert a namenek
        this.#name=value //beállítjuk a name-t
    }

    set work(value){ //definiálunk egy settert a worknek
        this.#work=value //beállítjuk a work-t
    }

    set concept(value){ //definiálunk egy settert a conceptnek
        this.#concept=value //beállítjuk a concept-t
    }

    /**
     * @returns {boolean}
     */
    validate(){ //definiálunk egy validate függvényt a példánynak
        return this.#name && this.#concept && this.#work //ha mindennek helyes értéke van igazzal tér vissza, egyébként hamis 
    }
}

export {AuthorManager}