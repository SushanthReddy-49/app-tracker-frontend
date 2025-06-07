export async function getJobs() {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/jobs`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

export async function getJobById(id) {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/jobs/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
}
export async function postJob(job) {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
}
export async function updateJob(id, job) {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_API_URI}/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
}
