/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */

import { FormView } from "./form.js"
import { ImportExport } from "./importexport.js"
import { AuthorManager } from "./manager.js"
import { Navigationbar } from "./navigationbar.js"
import { TableView } from "./table.js"
import { ViewElement } from "./viewelement.js"

const formFields = [ //létehozunk egy formField listát
    {
    id: 'author',
    label: 'Név',
    name: 'author'
    },
    {
    id: 'work',
    label: 'Mű',
    name: 'work'
    },
    {
    id: 'concept',
    label: 'Fogalom',
    name: 'concept'
    }
]

const headerArray = ['Szerző', 'Mű', 'Fogalom'] //létehozunk egy header listát

const manager=new AuthorManager() //példányosítjuk az AuthorManagert


const navbar=new Navigationbar() //példányosítjuk a navigationBart
navbar.appendTo(document.body) //hozzáfűzzük a navbar-t a document.body-hoz

const tableView=new TableView('table', headerArray, manager) //példányosítjuk a TableView-t
tableView.appendTo(document.body) //hozzáfűzzük a table-t a document.body-hoz
navbar.addViewElement('Táblázat', tableView) //hozzáadjuk a table-t a navigációsbárhoz

const formView=new FormView('tableForm', formFields, manager) //példányosítjuk a formot
formView.appendTo(document.body) //hozzáfűzzük a formcontrollert a document.body-hoz
navbar.addViewElement('Form', formView) //hozzáadjuk a formController-t a navigációsbárhoz


const importExport=new ImportExport('importexport',manager) //példányosítjuk az importexportot
importExport.appendTo(document.body) //hozzáfűzzük a document.body-hoz
navbar.addViewElement('Import/Export', importExport) //hozzáfűzzük az importExportot a navbarhoz

navbar.activate('table') //meghívjuk a navbar activate metódusát a table azonosítójával