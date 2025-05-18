import { axiosInstance } from "./axiosInstace";

export async function markIdle(
  containerId: string | null,
  userId: string | null
) {
  console.log("inside mark idle function");
  try {
    const response = await axiosInstance.patch("/api/container/status", {
      containerId,
      userId,
    });

    return response.data;
  } catch (error) {
    console.log("Error occured while marking the container Idle");
  }
}
