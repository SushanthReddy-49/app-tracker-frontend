export async function getJobs() {
  try {
    const response = await fetch("http://localhost:3000/api/jobs");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}