const getRequestBody = (extraFields: any) => JSON.stringify({
    "database": process.env.MONGODB_DB,
    "dataSource": process.env.MONGODB_CLUSTER,
    ...extraFields
})

const getHeaders = () => ({
    "Content-Type": "application/json",
    'Access-Control-Request-Headers': '*',
    'api-key': process.env.MONGODB_API_KEY,
})


const fetchDB = async (bodyFields: any, action: "insertOne" | "findOne") => {
    const body = getRequestBody(bodyFields);
    return await fetch(process.env.MONGODB_API_URL + action, {
        headers: getHeaders(),
        method: "POST",
        body
    }).then(response => response.json());
}

export default fetchDB;