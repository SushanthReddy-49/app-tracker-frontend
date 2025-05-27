import "../styles/NavBar.css"
import {Link} from "react-router-dom"
import { BiHomeAlt2 } from "react-icons/bi"; 
import { FiSearch } from "react-icons/fi";
import { JobContext } from "../context/JobContext";
import { useContext, useState } from "react";

function NavBar (){
const {allJobs, jobs, setJobs} = useContext(JobContext);
const [sortOrder, setSortOrder] = useState("desc"); // Add this line

  function sortByLastChecked(e) {
    e.preventDefault();
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    const sortedJobs = [...jobs].sort((a, b) => {
      if (newOrder === "asc") {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      } else {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });
    setJobs(sortedJobs);
    setSortOrder(newOrder);
  }

  function sortByApplicationDate(e) {
    e.preventDefault();
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    const sortedJobs = [...jobs].sort((a, b) => {
      if (newOrder === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setJobs(sortedJobs);
    setSortOrder(newOrder);
  }

  function searchJobs(e) {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase();
    const filteredJobs = allJobs.filter(job => 
      job.jobTitle.toLowerCase().startsWith(searchTerm) || 
      job.jobCompany.toLowerCase().includes(searchTerm)
    );
    setJobs(filteredJobs);
  }

  return (
  <div className="nav-bar">
    <div className="nav-items">
      <div className="nav-items-left">
        <div className="home">
          <Link to='/'><button id="home"><BiHomeAlt2 style={{height:"80%", width: "80%"}}/></button></Link>
        </div>
        <div className="add-job">
          <Link to='/add'><button id="add-job-btn">Add</button></Link>
        </div>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search Jobs" className="search-input" onChange={searchJobs} />
        </div>
      </div>
    <div className="sort-block">
        <div>Sort By:
        </div>
        <div className="sort-links">
          <a href="" onClick={sortByApplicationDate} >Application Date</a>
          <a href="" onClick={sortByLastChecked}>Last Checked</a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NavBar