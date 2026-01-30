import { muvelet2, muveletLethrehoz } from "./functions.js"

const input1=document.createElement('input')
input1.id='input_egy'
document.body.appendChild(input1)
const input2=document.createElement('input')
input2.id='input_ketto'
document.body.appendChild(input2)
const input3=document.createElement('input')
input3.id='input_harom'
document.body.appendChild(input3)
const div=document.createElement('div')
document.body.appendChild(div)
const gomb=document.createElement('button')
gomb.innerText='gomb'
document.body.appendChild(gomb)
gomb.addEventListener('click',function(){
    const input_egy_value=Number(input1.value)
    const input_ketto_value=Number(input2.value)
    const {res}=muvelet2(input_egy_value,input_ketto_value,muveletLethrehoz(input3.value))
    div.innerText=res
})

const fv=muveletLethrehoz('+')
console.log(fv(1,2))


