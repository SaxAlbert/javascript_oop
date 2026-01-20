class Tanyer{
    constructor(szin){
        this.szin=szin
    }
}

class KisTanyer extends Tanyer{
    constructor(szin){
        super(szin)
        this.meret='kicsi'
    }
}
class NagyTanyer extends Tanyer{
    constructor(szin){
        super(szin)
        this.meret='nagy'
    }
}
const tanyer1=new NagyTanyer('kék')
const tanyer2=new KisTanyer('piros')
const tanyer3=new KisTanyer('zöld')

console.log(tanyer1)
console.log(tanyer2)
console.log(tanyer3)

class Pohar{

}
const pohar=new Pohar()
console.log(pohar)

//------------------------------------
console.log('-------------------------------------------------')

function Tanyer2(szin){
    this.szin=szin
}
function KisTanyer2(szin){
    Tanyer2.call(this,szin)
    this.meret='kicsi'
}
function NagyTanyer2(szin){
    Tanyer2.call(this,szin)
    this.meret='nagy'
}

const ujtanyer1=new KisTanyer2('kék')
const ujtanyer2=new KisTanyer2('zöld')
const ujtanyer3=new NagyTanyer2('piros')

console.log(ujtanyer1)
console.log(ujtanyer2)
console.log(ujtanyer3)

function Pohar2(){
    
}
const pohar2=new Pohar2()

console.log(pohar2)