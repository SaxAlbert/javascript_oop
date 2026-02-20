import { Manager } from "./manager.js";

class FormController{
    /**
     * @type {Manager}
     */
    #manager
    /**
     * @type {HTMLFormElement}
     */
    #form
    /**
     * @type {FormField[]}
     */
    #formFieldElemList
    /**
     * 
     * @param {formFieldType[]} formFieldList 
     * @param {Manager} manager 
     */
    constructor(formFieldList,manager){
        this.#manager=manager
        const form=document.createElement('form')
        this.#form=form
        document.body.appendChild(form)
        //itt lesznek a bevitelimezők rendezései
        
        this.#formFieldElemList=[]
        for(const arr of formFieldList){
            const formFieldElem=new FormField(arr.id,arr.name,arr.label,arr.required,this.#form)
            this.#formFieldElemList.push(formFieldElem)
        }
        const button=document.createElement('button')
        button.innerText='Küldés'
        this.#form.appendChild(button)

        this.#form.addEventListener('submit',(e)=>{
            e.preventDefault()
            const elem=this.#createElement()
            if(elem){
                this.#manager.addElement(elem)
                e.target.reset()
            }
            
        })
    }
    /**
     * 
     * @returns {ColspanType | RowspanType | null}
     */
    #createElement(){
        const obj={}
        let valid=true
        for(const arr of this.#formFieldElemList){
            if(arr.validate()){
                obj[arr.name]=arr.value
            }
            else{
                valid=false
            }
            
        }
        
        if(valid){
            return obj
        }
        else{
            return null
        }
    }
}

class FormField{

    /**
     * @type {HTMLInputElement}
     */
    #input
    /**
     * @type {string}
     */
    #name
    get value(){
        return this.#input.value ? this.#input.value : undefined
    }

    get name(){
        return this.#name
    }
    /**
     * @type {boolean}
     */
    #required

    /**
     * @type {HTMLDivElement}
     */
    #errorDiv

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelContent 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id,name,labelContent,required,parent){
        const div=document.createElement('div')
        parent.appendChild(div)

        const label=document.createElement('label')
        label.innerText=labelContent
        label.htmlFor=id
        div.appendChild(label)

        div.appendChild(document.createElement('br'))

        const input=document.createElement('input')
        input.id=id
        input.name=name
        div.appendChild(input)
        this.#input=input
        this.#name=name

        const errorDiv=document.createElement('div')
        errorDiv.classList.add('error')
        div.appendChild(errorDiv)

        this.#required=required
        this.#errorDiv=errorDiv

    }
    /**
     * @returns {boolean}
     */
    validate(){
        let result=true;
        if(this.#required && !this.value){
            result=false
            this.#errorDiv.innerText='Kötelező!'
        }
        else{
            this.#errorDiv.innerText='Nem kötelező'
        }
        return result
    }
}

export {FormController}