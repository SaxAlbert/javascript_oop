import { muvelet2,muveletLethrehoz } from "./functions.js"

class Gomb{
    /**
     * 
     * @param {HTMLInputElement} input1 
     * @param {HTMLInputElement} input2 
     * @param {string} muveletString 
     * @param {HTMLDivElement} eredmenyDiv 
     */
    constructor(input1,input2,muveletString,eredmenyDiv){
        const button=document.createElement('button')
        button.innerText=muveletString
        document.body.appendChild(button)
        button.addEventListener('click',this.#calculate(input1,input2,eredmenyDiv).bind(muveletString))
    }
    /**
     * 
     * @param {HTMLInputElement} input1 
     * @param {HTMLInputElement} input2 
     * @param {HTMLDivElement} eredmenyDiv 
     * @returns 
     */
    #calculate(input1,input2,eredmenyDiv){
        return function(){
            const inp1=Number(input1.value)
            const inp2=Number(input2.value)
            const {res}=muvelet2(inp1,inp2,muveletLethrehoz(this))
            eredmenyDiv.innerText=res
        }
    }
}
export {Gomb}