import { useId } from "react";
import { db } from "../libs/db.js";


export const createPlaylist = async (req,res)=>{
    try {
        const {name,description} = req.body;

        const userId = req.user.id;

        const playlist = await db.playlist.create({
            data:{
                name,
                description,
                userId
            }
        })

        res.status(200).json({
            success :true,
            message:"Playlist Created Successfully",
            playlist
        })
    } catch (error) {
        console.error("Error creating playlist:",error)
        res.status(500).json({error:"Failed to create playlist"})
    }
}

export const getAllListDetails = async (req,res) =>{
    try {
        const playlists = await db.playlist.findMany({
            where:{
                userId:req.user.id
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        })

        res.status(200).json({
            success :true,
            message:"Playlist fetched Successfully",
            playlists
        })
    } catch (error) {
        console.error("Error fetching playlist:",error)
        res.status(500).json({error:"Failed to fetch playlist"})
    }
 }

export const getPlayListDetails = async (req,res) =>{
    const {playlistId} = req.params;
    try {
        const playlist = await db.playlist.findUnique({
            where:{
                is:playlistId,
                useId:req.user.id
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        })

        if(!playlist){
            return res.status(404).json({error:"Playlist not found"})
        }

        res.status(200).json({
            success :true,
            message:"Playlist fetched Successfully",
            playlist
        })

    } catch (error) {
        console.error("Error fetching playlist:",error)
        res.status(500).json({error:"Failed to fetch playlist"})
    }
}

export const addProblemToPlaylist = async (req, res) =>{ 
    const {playlistId} = req.params;
    const {problemIds} = req.body;

    try {
        if(!Array.isArray(problemIds) || problemIds.length ===0){
            return res.status(400).json({
                error:"Invalid or missing problemId"
            })
        }

        //create recors for each problems in the playlist

        const problemsInPlaylist = await db.problemsInPlaylist.createMany({
            data:problemIds.map((problemId) => ({
                playlistId,
                problemId
            }))
        })

        res.status(201).json({
            success :true,
            message:"problems added to playlist Successfully",
            problemsInPlaylist,
        })

    } catch (error) {
        console.error("Error while adding to playlist:",error)
        res.status(500).json({error:"Failed to added in playlist"})
    }
}

export const deletePlaylist = async (req, res) => {
    const {playlistId} = req.params;

    try {
        const deletedPlaylist = await db.playlist.delete({
            where:{
                id:playlistId
            }
        }) 

        res.status(201).json({
            success :true,
            message:"Playlist deleted Successfully",
            deletedPlaylist,
        })
    } catch (error) {
        console.error("Error while deleting  playlist:",error)
        res.status(500).json({error:"Failed to delete  playlist"})
    }
}


export const removeProblemFromPlaylist = async (req, res) => {
    const {playlistId} = req.params;
    const {problemIds} = req.body;

    try {
        if(!Array.isArray(problemIds) || problemIds.length ===0){
            return res.status(400).json({
                error:"Invalid or missing problemId"
            })
        }

        const deletedProblem = await db.problemsInPlaylist.deleteMany({
            where:{
                playlistId,
                problemId:{
                    in:problemIds
                }
            }
        })

        res.status(200).json({
            success :true,
            message:"Problem removed from playlist Successfully",
            deletedProblem,
        })
    } catch (error) {
        console.error("Error while deleting  from playlist:",error)
        res.status(500).json({error:"Failed to delete from  playlist"})
    }
}
