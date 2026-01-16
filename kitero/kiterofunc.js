function Student(name){
    this.name=name 
    this.askedQuestionnumber=0
    
}
function StudentWithWork(name){
    Student.call(this,name)
    this.workDone=0
}

Object.setPrototypeOf(StudentWithWork.prototype,Student.prototype)

Student.prototype.askedQuestion=function(){
    console.log('???')
    this.askedQuestionnumber++
}
StudentWithWork.prototype.doWork=function(){
    this.workDone++
}
const stu1=new Student('Albert')
console.log(stu1)
stu1.askedQuestion()
console.log(stu1)

const stu2=new Student('Hans')
console.log(stu2)

const stru3=new StudentWithWork('Sebastian')
console.log(stru3)
console.log(stru3.workDone)

stru3.doWork()
console.log(stru3)
