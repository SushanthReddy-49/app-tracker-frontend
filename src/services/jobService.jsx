export async function getJobs() {
  try {
    const response = await fetch("http://app-tracker-backend:4000/api/jobs");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}