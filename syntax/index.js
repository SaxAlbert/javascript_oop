import { muvelet2, muveletLethrehoz } from "./functions.js"
import { Gomb } from "./gomb.js"

const input1=document.createElement('input')
input1.id='input_egy'
document.body.appendChild(input1)

const input2=document.createElement('input')
input2.id='input_ketto'
document.body.appendChild(input2)

const div=document.createElement('div')
document.body.appendChild(div)


const fv=muveletLethrehoz('+')
console.log(fv(1,2))


const osszead=new Gomb(input1,input2,"+",div)
const kivon=new Gomb(input1,input2,"-",div)
const osztas=new Gomb(input1,input2,"*",div)