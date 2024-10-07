import logger from "../logger";
import { constants } from "../utils/constants";

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      logger.error(constants.ERR_MESSAGE);
      throw new Error(constants.ERR_MESSAGE);
    }
    const data = await response.json();
    logger.log("Fetch customer transaction data", data);
    return data;
  } catch (error) {
    console.error(constants.ERR_MESSAGE, error);
    throw error;
  }
};
