import {useState, useEffect, useContext, createContext} from 'react'
import {getJobs} from "../services/jobService";

const JobContext = createContext();

function JobProvider({children}){
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  async function fetchJobs() {
      try {
        const jobsData = await getJobs();
        setJobs(jobsData);
        setAllJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
  }
  
  async function postJob(job){
  try{
    const response = await fetch("http://localhost:3000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (response.status === 200) {
      alert("Job added successfully");
      fetchJobs();
      return await response.json();
    } else {
      throw new Error("Error adding job");
    }
  }catch(error){
    alert("Error adding job");
    console.error("Error:", error);
  }
}

  useEffect(() => {
    fetchJobs();
  }, []);

  const value ={
    jobs,
    setJobs,
    allJobs,
    postJob
  }

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
}

export { JobProvider, JobContext };