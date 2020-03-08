import app from "./app";
import serverless from "serverless-http";

const handler = serverless(app);
module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
};
