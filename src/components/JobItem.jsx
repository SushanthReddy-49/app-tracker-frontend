import "../styles/JobItem.css";
import { FiEdit2 } from "react-icons/fi";
import { SlTrash } from "react-icons/sl";
import { useContext } from "react";
import { JobContext } from "../context/JobContext";


function JobItem({ job }) {
  const { deleteJob } = useContext(JobContext);

  const goToJobPage = () => {
    window.open(job.jobPortalUrl, "_blank", "noopener,noreferrer");
  };

  const updateStatus = async (e) => {
    const updatedJob = { ...job, jobCurrentStatus: e.target.value };
    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/jobs/${job._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJob),
      });
      if (response.ok) {
        console.log("Job status updated successfully");
      } else {
        console.error("Error updating job status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  }

const handleDelete = () =>{
  deleteJob(job._id)
  .then(() => {
    console.log("Job deleted successfully");
  })
  .catch((error) => {
    console.error("Error deleting job:", error);
  });
} // Handle case where job is not provided

  return (
    <div className="job-item">
      <div className="job-info">
        <div className="job-details">
          <div className="job-title-container">
            <h3 id="job-title" onClick={goToJobPage}>{job.jobTitle}</h3>
            <FiEdit2 className="edit-icon" onClick={() => {}} />
            <SlTrash className="delete-icon" onClick={handleDelete} />
          </div>
          <p>{job.jobCompany}</p>
        </div>
        <div className="job-status">
            <select onChange={updateStatus} name="job-current-status">
              <option value={job.jobCurrentStatus}>{job.jobCurrentStatus}</option>
              <option value="Applied">Applied</option>
              <option value="In Progress">In Progress</option>
              <option value="Interview">Interview</option>
            </select>
        </div>
      </div>
      <div className="job-update-details">
        <p>LastChecked: {new Date(job.updatedAt).toLocaleTimeString()}</p>
        <p>Status on Portal: {job.jobPortalStatus}</p>
      </div>
    </div>
  );
}

export default JobItem;
