import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";


export const executeCode = async (req,res) =>{
    try {
        const {source_code, language_id, stdin, expected_outputs, problemId} = req.body;

        const userId = req.user.id

        //validate the test cases 
        if(
            !Array.isArray(stdin) ||
            stdin.length === 0 ||
            !Array.isArray(expected_outputs) ||
            expected_outputs.length !== stdin.length
        ){
            return res.status(400).json({
                error:"Invalid or missing test cases"
            })
        }

        //2. prepare each test cases for judge0 baych submission 

        const submissions = stdin.map((input) =>({
            source_code,
            language_id,
            stdin:input,
        }));

        //3. send this batch of submission to judge0

        const submitResponse = await submitBatch(submissions)

        const tokens = submitResponse.map((res) => res.token);

        //4. poll judge0 for result of all submitted test cases

        const results  = await pollBatchResults(tokens);


        console.log("Results-------------------------");
        console.log(results);

        res.status(200).json({
            message:"Code executed !"
        })
        
        


    } catch (error) {
        res.status(500).json({
            message:"Failed code execution"
        })
    }
}