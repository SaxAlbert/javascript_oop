/** 
 * @typedef {{author: string, title1: string, concepts1: string, title2?: string,  concepts2?: string}} RowspanRowType  
 * @typedef {{author: string, title: string, concepts: string, concepts2?: string}} ColspanRowType
 * @typedef {{name: string, colSpan?: number}} HeaderType
 * @callback visszahiv
 * @type {HTMLTableSectionElement}
*/

/** @type {HeaderType[]}  */
const rowspanHeaderArr = [{name: "Szerző"}, {name: "Mű"}, {name: "Fogalmak"}] 
/** @type {HeaderType[]}   */
const colspanHeaderArr = [{name: "Szerző"},{name: "Mű"} , {name: "Fogalmak" ,colSpan: 2}] 

/** @type {RowspanRowType[]}  */
const rowspanBodyArr = [
    {
        author: "Appolliniare",
        title1: "A megsebzett galamb és a szökőkút", 
        concepts1: "képvers", 
        title2: "Búcsú",
        concepts2: "avantgárd" 
    },
    {
        author: "Thomas Mann",
        title1: "Mario és a varázsló",
        concepts1: "kisregény" 
    },
    {
        author: "Franz Kafka",
        title1: "A per", 
        concepts1: "képvers", 
        title2: "Az átvlátozás", 
        concepts2: "kisregény" 
    }
]



/** @type {ColspanRowType[]} */
const colspanBodyArr = [ 
    {
        author: "Appolliniare", 
        title: "A megsebzett galamb és a szökőkút",
        concepts: "Képvers",  
        concepts2: "Emlékezés", 
    },
    {
        author: "Appolliniare", 
        title: "Búcsú", 
        concepts: "Avantgárd" 
    },
    {
        author: "Thomas Mann", 
        title: "Mario és a varázsló", 
        concepts: "Kisregény" 
    },
    {
        author: "Franz Kafka",
        title: "A per", 
        concepts: "regény" 
    },
    {
        author: "Franz Kafka", 
        title: "Az átváltozás",
        concepts: "kisregény", 
        concepts2: "groteszk" 
    }
]

//renderColspanBody(makeTableBodyWithHeader(colspanHeaderArr), colspanBodyArr)
//renderRowspanBody(makeTableBodyWithHeader(rowspanHeaderArr), rowspanBodyArr)

class Table{
    #tbody;
    get tbody(){
        return this.#tbody
    }
    constructor(tableHeaderArray){
        this.#tbody=makeTableBodyWithHeader(tableHeaderArray)
    }
    /**
     * 
     * @param {visszahiv} a 
     */
    metodus(a) {
        a(this.#tbody)
    }
    
}
class Colspantable extends Table{
    constructor(tableHeaderArray){
        super(tableHeaderArray)
    }
    /**
     * @param {ColspanRowType[]} a 
     */
    render(a){
        renderColspanBody(this.tbody,a)
    }  
}
class Rowspantable extends Table{
    constructor(tableHeaderArray){
        super(tableHeaderArray)
    }
    /**
     * 
     * @param {RowspanRowType} a 
     */
    render(a){
        renderRowspanBody(this.tbody,a)
    }
}

const rowspantable=new Rowspantable(rowspanHeaderArr)
rowspantable.render(rowspanBodyArr)
const colspantable=new Colspantable(colspanHeaderArr)
colspantable.render(colspanBodyArr)

const button=document.createElement('button')
button.innerText='Rowspan hozzáadása'
document.body.appendChild(button)
button.addEventListener('click',buttonM.bind(rowspantable))
/**
 * @this {Rowspantable}
 */
function buttonM(){
    /**
     * @type {RowspanRowType}
     */
    const obj={
        author: "Appolliniare",
        title1: "A megsebzett galamb és a szökőkút", 
        concepts1: "képvers", 
    }
    this.metodus(function(body){
        const tr=document.createElement('tr')
        body.appendChild(tr)

        const td1=document.createElement('td')
        const td2=document.createElement('td')
        const td3=document.createElement('td')

        td1.innerText=obj.author
        td2.innerText=obj.title1
        td3.innerText=obj.concepts1

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
    })
}