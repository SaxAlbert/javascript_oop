import { Manager } from "./manager.js";
/** 
 * @callback TableCallback
 * @param {HTMLTableSectionElement} tbody
 * @param {ColspanType | RowspanType} tableRow
 * @returns {void}
 */

class Table{
    /**
     * @type {HTMLTableSectionElement}
     */
    #tbody
    /**
     * @type {Manager}
     */
    #manager

    /**
     * 
     * @param {HeaderType[]} headerArray 
     * @param {Manager} manager 
     */
    constructor(headerArray, manager){
        this.#manager = manager
        
        const table = document.body.appendChild(document.createElement("table"))
        const thead = table.appendChild(document.createElement("thead"))
        this.#tbody = table.appendChild(document.createElement("tbody"))

        for (const i of headerArray){
            const th = document.createElement("th")
            th.innerText=i.name
            if(i.colspan==2){
                th.colSpan=2
            }
            thead.appendChild(th)
        }
    }

    /**
     * 
     * @param {TableCallback} callback 
     */
    setAppendRow(callback){
        this.#manager.addCallback = (row) => {callback(this.#tbody, row)}
    }
}

export {Table}