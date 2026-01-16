class Student{
    constructor(name){
        this.name=name
        this.askedQuestionNumber=0
    }
    askedQuestion(){
        console.log('???')
        this.askedQuestionNumber++
    }
}

const stu1=new Student('Hans')
stu1.askedQuestion()
console.log(stu1)

class StudentWithWork extends Student{
    constructor(name){
        super(name)
        this.workDone=0
    }
    doWork(){
        this.workDone++
    }
}
const stu2=new StudentWithWork('Béla')
console.log(stu2)
stu2.doWork()
console.log(stu2.workDone)
stu2.askedQuestion()
console.log(stu2)
