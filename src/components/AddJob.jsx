import { useState } from "react";
import "../styles/AddJob.css";
import { useContext } from "react";
import { JobContext } from "../context/JobContext";

function AddJob() {
  const {postJob} = useContext(JobContext);
  const [form, setForm] = useState({
    jobTitle: "",
    jobCompany: "",
    jobPortalUrl: "",
    jobPortalStatus: "",
    referred: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const job = { ...form };
    postJob(job);
    setForm({
      jobTitle: "",
      jobCompany: "",
      jobPortalUrl: "",
      jobPortalStatus: "",
      referred: false,
    });
  }

  return (
    <div className="form-bg">
      <form className="job-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="job-title">Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            id="job-title"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-company">Company</label>
          <input
            type="text"
            placeholder="Company"
            id="job-company"
            name="jobCompany"
            value={form.jobCompany}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-portal-url">Job Site</label>
          <input
            type="text"
            placeholder="Job Site"
            id="job-portal-url"
            name="jobPortalUrl"
            value={form.jobPortalUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-portal-status">Portal Status</label>
          <input
            type="text"
            placeholder="Portal Status"
            id="job-portal-status"
            name="jobPortalStatus"
            value={form.jobPortalStatus}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="referred">Referred</label>
          <input
            type="checkbox"
            id="referred"
            name="referred"
            checked={form.referred}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddJob;
