import { createInputAndErrorDiv } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewelement.js";

class FormView extends ViewElement{ //leszármazunk a ViewElementből és definiáljuk a FormController osztályt
    /**
     * @type {FormField[]}
     */
    #formInputList  //létrehozzunk egy privát formInputList tulajdonságot
    /**
     * @type {AuthorManager}
     */
    #manager //létrehozzunk egy privát manager tulajdonságot
    /**
     * @type {HTMLFormElement}
     */
    #form //létrehozzunk egy privát form tulajdonságot

    /**
     * 
     * @param {string} id 
     * @param {import("./index.js").FormFieldType[]} FormFieldList 
     * @param {AuthorManager} manager 
     */
    constructor(id,FormFieldList, manager){ //létrehozunk egy konstruktort
        super(id)//meghívjuk a szülőosztály konstruktorát
        this.#manager=manager //értéket adunk a privát manager tulajdonságnak
        this.#formInputList=[]//létrehozunk egy üres listát a privát formInputList tulajdonságnak 
        this.#form=document.createElement('form') //létrehozunk egy formot
        for(const field of FormFieldList){//végigiterálunk a bemeneti formFieldList paraméterén
            const formField=new FormField(field.id,field.label,field.name,this.#form)//őéldányosítjuk a formfield-et
            this.#formInputList.push(formField)// hozzáadjuk a formInputList listához
        }
        const button=document.createElement('button')//létrehozunk egy gombot
        button.innerText="Küldés"//megadjuk a szövegét
        this.#form.appendChild(button)//hozzáadjuk a formhoz
        const resultDiv=document.createElement('div')//létrehozunk egy divet
        this.div.appendChild(resultDiv)//hozzácsattoljuk a resultDiv-et a viewElement div-hez
        this.#form.addEventListener('submit', (e)=>{ //feliratkozunk a form submit eseménykezelőre
            e.preventDefault()// megakadályozzuk az űrlap alapértelemzett működését
            const elem=this.#createElement()//meghívjuk a createElement metódust
            this.#manager.addElement(elem) //Meghívjuk a manager addElement függvényét
        })
        this.div.appendChild(this.#form)//hozzácsattoljuk a formot a divhez
        this.#manager.addElementResultCallback=(result)=>{//definiáljuk az addElementResultCallbacket
            resultDiv.innerText=result //beállítjuk a resultDiv értékének a kapott stringet
            setTimeout(()=>{ //meghívjuk a setTimeout-ot
                resultDiv.innerText=""//töröljuk a resultDiv tartalmát
            },1500)//másfél másodperc múlva
        }
    }
    /**
     * @returns {import("./index.js").AuthorType}
     */
    #createElement(){// createElement metódus definiálása
        /**
         * @type {import("./index.js").AuthorType}
         */
        let result={}//létrehozunk egy AuthorType típusú objektumot
        for(const field of this.#formInputList){//végigiterlunk a formInputList elemein
            if(field.validate())//meghívjuk minden fieldre a validate függvényt
                result[field.name]=field.value // a result objektum formInputFiled name értékével megegyező nevű tulajdonságának megadjuk a forminput beviteli mezőjének
        }
        return result
    }
}

class FormField{ //definiálunk egy FormField osztályt
    /**
     * @type {HTMLInputElement}
     */
    #inputElement //definiálunk egy inputElement privát tulajdonságot
    /**
     * @type {HTMLDivElement}
     */
    #errorDiv //definiálunk egy errorDiv privát tulajdonságot
    /**
     * @type {string}
     */
    #name //definiálunk egy name privát tulajdonságot
    

    get name(){ //definiálunk gettert a namenek
        return this.#name
    }
    get value(){ //definiálunk gettert a value
        return this.#inputElement.value ? this.#inputElement.value : undefined //amennyiben az inputElementnek van beírt értéke azt kapja meg, máskülönben undefind
    }

    /**
     * 
     * @param {string} id 
     * @param {string} label 
     * @param {string} name 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, label, name, parent){// definiálunk egy konstruktort
        const {input, errorDiv}=createInputAndErrorDiv({id,label,name,parent}) //létrehozunk egy divet ami tartalmaz egy
        this.#name=name //beállítjuk a name tulajdonság értékét
        this.#inputElement=input //a visszatérési érték input tulajdonságának értékét állítják be
        this.#errorDiv=errorDiv //a visszatérési érték errorDiv tulajdonságának értékét állítják be
    }
    /**
     * @returns {boolean}
     */
    validate(){ //definiálunk egy validate függvényt
        let result=true// létrehozunk egy változót igaz visszatérési értékkel
        if(!this.value){ //ha a value undefind
            this.#errorDiv.innerText="Mező kitöltése kötelező"//beállítjuk az errorDiv értékét hibaüzenetre
            result=false //result értéke hamis lesz
        }
        else{
            this.#errorDiv.innerText=" " //töröljük az errorDiv értékét
        }
        return result //visszaadja a result-ot
    }

}
export {FormView}