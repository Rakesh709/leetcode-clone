
import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";
import axios from "axios";

export const useProblemStore = create((set) => ({
    problems: [],
    problem: null,
    solvedProblems: [],
    isProblemsLoading: false,
    isProblemLoading: false,

    //the way we do in controller
    getAllProblem: async () => {
        try {
            set({ isProblemLoading: true })

            const res = await axiosInstance.get(".problems/get-all-problems");

            set({ problems: res.data.problems })
        } catch (error) {
            console.log("Error getting all problems", error);
            toast.error("Error in getting problems")

        }
        finally {
            set({ isProblemsLoading: false })
        }
    },

    getProblemById: async () => {
        try {
            set({ isProblemLoading: true })

            const res = await axiosInstance.get(`/problems/get-problem/${id}`)

            set({ pro: res.data.problem })

            toast.success(res.data.message)
        } catch (error) {
            console.log("Error getting  problems", error);
            toast.error("Error in getting problems")
        }
        finally {
            set({ isProblemLoading: false })
        }
    },

    getSolvedProblemByUser: async () => {
        try {
            const res = await axiosInstance("/problems/get-solved-problem")

            set({ solvedProblems: res.data.problems })

        } catch (error) {
            console.log("Error getting solved problems", error);
            toast.error("Error getting solved problems");
        }

    }
}))