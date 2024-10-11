import logger from "../logger";

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      logger.error("An Error occured while fetching data");
      throw new Error("Network response was not ok");
    }
    return await response.json();
    logger.log("Fetch customer transaction data", await response.json());
  } catch (error) {
    console.error("Fetch error", error);
    throw error;
  }
};
