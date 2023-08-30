const axios = require('axios');
require('dotenv').config()

const baseUrl = process.env.FHIR_SERVER_BASE_URL;
const credentials = {
  username: process.env.FHIR_SERVER_USERNAME,
  password: process.env.FHIR_SERVER_PASSWORD,
};

/**
 *
 * @param resourceType type of resource to be fetched
 * @param referenceType type of reference (Patient or Encounter)
 * @param referenceId id of reference
 * @return {Promise<*[]>}
 */
exports.fetchData = async ( resourceType,
                          referenceType = undefined,
                          referenceId = undefined) => {
  const resultList = [];
  const params = {
    _count: 200,
    _sort: '-_lastUpdated',
  };

  if (referenceType) {
    if (referenceType === 'Patient') {
      params.subject = referenceId;
    } else if (referenceType === 'Encounter') {
      params.encounter = referenceId;
    } else {
      console.error('did not provide a known referenceType');
    }
    if (!referenceId) {
      console.error('did not provide a referenceId');
    }
  }

  try {
    const res = await axios.get(`${baseUrl}/${resourceType}`, {
      auth: credentials,
      headers: {
        Accept: 'application/fhir+json',
      },
      params,
    });
    if (res.data.total > 0) {
      // console.log('Axios response: ', JSON.stringify(res.data, null, 2));
      res.data['entry'].forEach((item) => resultList.push(item.resource));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios request failed: ',
        JSON.stringify(error.response?.data, null, 2),
        JSON.stringify(error, null, 2));
    } else {
      console.error(error);
    }
    throw new Error(error);
  }
  return resultList;
};
