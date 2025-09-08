
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
import { useProblemStore } from "../store/useProblemStore";

import { getLanguageId } from "../libs/utils";
import { useExecutionStore } from "../store/useExecution";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";

const ProblemPage = () => {
    const {id} = useParams();

    const { getProblemById, problem, isProblemLoading } = useProblemStore();

    useEffect(() => {
    getProblemById(id);
    

    }, [id]);
  return (
    <div>
    Hello  {JSON.stringify(pro)}
    </div>
  )
}

export default ProblemPage