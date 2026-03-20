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

const formFields = [
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

const headerArray = ['Szerző', 'Mű', 'Fogalom']

const manager=new AuthorManager()


const navbar=new Navigationbar()
navbar.appendTo(document.body)

const tableView=new TableView('table', headerArray, manager)
tableView.appendTo(document.body)
navbar.addViewElement('Táblázat', tableView)

const formView=new FormView('tableForm', formFields, manager)
formView.appendTo(document.body)
navbar.addViewElement('Form', formView)

const importExport=new ImportExport('importexport',manager)
importExport.appendTo(document.body)
navbar.addViewElement('Import/Export', importExport)

navbar.activate('table')