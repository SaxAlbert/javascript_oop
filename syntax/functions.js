const muvelet2=(a,b,callback)=>{
    const res=callback(a,b)
    return {res}
}

const muveletLethrehoz=(e)=>{
    if(e=='+'){
        return (a,b)=>a+b
    }
    if(e=='*'){
        return (a,b)=>a*b
    }
    if(e=='-'){
        return (a,b)=>a-b
    }
    if(e=='/'){
        return (a,b)=>a/b
    }
};
export {muvelet2,muveletLethrehoz};