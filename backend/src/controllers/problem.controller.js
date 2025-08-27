import { db } from "../libs/db.js";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
    // going to get all the data from the request
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
    } = req.body;

    //going to check the user role once again admin or user
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            error: "You are not allowed to create a problem",
        });
    }

    // loop through each refrence solution for diffrent lanaguage


    try {
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);

            if (!languageId) {
                return res.status(400).json({
                    error: `Language ${language} is not supported`,
                });
            }


            //for the submition -> input and exprected output
            //array of submition for each test cases
            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }));


            //batches
            const submissionResults = await submitBatch(submissions);

            const tokens = submissionResults.map((res) => res.token);


            //kind of polling [[ho gya kya baar baar check krega ]]

            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result----", result);


                if (result.status.id !== 3) {
                    return res.status(400).json({
                        error: `TestCases ${i + 1} failed for language ${language}`,
                    });
                }
            }
        }
        // save the problem tot he database;

        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Problem Created Successfully",
            problem: newProblem,
        });
    } catch (error) {
        console.log("Failed to create Problem");
        console.error("Failed to create Problem:", error);
        res.status(500).json({
            error: "Error while creating problem",
            error: error.message || "Error while creating problem",
        });
    }
};

export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany();

        if (!problems) {
            return res.status(404).json({
                error: "No Problem found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Messaged fetched Successfully",
            problems
        })
    } catch (error) {
        console.log("Failed to fetched Problem");
        console.error("Failed to fetched Problem:", error);
        res.status(500).json({
            error: "Error while fetched problem",
            error: error.message || "Error while fetched problem",
        });
    }
}

export const getAllProblemById = async (req, res) => {
    const { id } = req.params;

    try {
        const problem = await db.problem.findUnique({
            where: {
                id,
            },
        });

        if (!problem) {
            return res.status(404).json({
                success: true,
                message: "Problem not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Problem found successfully",
            problem
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error while fetching problems",
        });
    }

};

export const updateProblem = async (req, res) => {

    //id
    //id --> problem(condtion)
    //baki kaam same as create
    // create ki jah update krna 
};

export const deleteProblem = async (req, res) => {
    const { id } = req.params;

    try {
        const problem = await db.problem.findUnique({ where: { id } })

        if (!problem) {
            return res.status(404).json({ error: "Problem not found" })
        }

        await db.problem.delete({ where: { id } })

        res.status(200).json({
            success: true,
            message: "Problem deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While deleting the problem",
        });

    }
};

export const getAllProblemsSolvedByUser = async (req, res) => {

 };
