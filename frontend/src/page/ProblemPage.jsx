
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore.js";


// import { useExecutionStore } from "../store/useExecution";
// import { useSubmissionStore } from "../store/useSubmissionStore";
// import Submission from "../components/Submission";
// import SubmissionsList from "../components/SubmissionList";

const ProblemPage = () => {
  const { id } = useParams();
  console.log(id);
  

  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  useEffect(() => {
    getProblemById(id);

  }, [id]);

  // console.log(problem);

  return (
    <div>
      Hello  {JSON.stringify(problem)}
    </div>
  )
}

export default ProblemPage