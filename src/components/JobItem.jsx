import "../styles/JobItem.css";

function JobItem({ job }) {
  const goToJobPage = () => {
    window.open(job.jobPortalUrl, "_blank", "noopener,noreferrer");
  };

  const updateStaus = async (e) => {
    const updatedJob = { ...job, jobCurrentStatus: e.target.value };
    try {
      const response = await fetch(`http://localhost:3000/api/jobs/${job._id}`, {
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


  return (
    <div className="job-item">
      <div className="job-info">
        <div className="job-details">
          <h3 id="job-title" onClick={goToJobPage}>{job.jobTitle}</h3>
          <p>{job.jobCompany}</p>
        </div>
        <div className="job-status">
            <select onChange={updateStaus} name="job-current-status">
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
