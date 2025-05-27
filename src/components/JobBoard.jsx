import JobItem from "./JobItem"
import "../styles/JobBoard.css"
import { useContext } from "react";
import { JobContext } from "../context/JobContext";

function JobBoard() {
const {jobs} = useContext(JobContext);

  return <div className="job-board">
    {jobs.map(job => <JobItem job={job} key={job._id}></JobItem>)}
  </div>
}

export default JobBoard