import axios from "axios";

export const getJudge0LanguageId = (Language) =>{
    const languageMap ={
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }

    return  languageMap[Language.toUpperCase()];
}

//jab bhi pehle bar hit krtte hait o do baat hit krte hai 
//1. we will get the token 
// store the token in array
// judge0 ko identify krne mai help krta hai

const sleep = (ms)=> new Promise((resolve)=> setTimeout(resolve,ms))

export const pollBatchResults = async (tokens) =>{
    while(true){
        const {data}= await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:true,
            }
        })

        const results = data.submissions;

        const isAllDone = results.every(
            (r)=> r.status.id !==1 && r.status.id !==2
        )

        if(isAllDone) return results
        await sleep(1000)
    }
}





//jo judge0 kai end point hai usko hit krega
export const submitBatch = async (submissions)=>{
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions
    })
    


    console.log("Submission Results: ", data)

    return data // [{token} , {token} , {token}]
}

export function getLanguageName(languageId){
    const LANGUAGE_NAMES = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
    }

    return LANGUAGE_NAMES[languageId] || "Unknown"
}