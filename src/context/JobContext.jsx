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
    const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/jobs`, {
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

 async function deleteJob(id) {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/jobs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    fetchJobs(); // Refresh the job list after deletion
    return await response.json();
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
}

  useEffect(() => {
    fetchJobs();
  }, []);

  const value ={
    jobs,
    setJobs,
    allJobs,
    postJob,
    deleteJob
  }

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
}

export { JobProvider, JobContext };