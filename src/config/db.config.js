const AWS = require("aws-sdk");
const constants = require("../config/constants.config");

const awsConfig = {
    "region": constants.AWS_REGION,
    "accessKeyId": constants.AWS_ACCESS_KEY_ID,
    "secretAccessKey": constants.AWS_SECRET_KEY,
    "sessionToken": constants.AWS_SESSION_TOKEN
};

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const insertDb = async(tablename, input) => {
    let params = {
        TableName: tablename,
        Item: input
    };
    try {
        await docClient.put(params).promise();
        return input;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const updateDb = async(tablename, input) => {
    let params = {
        TableName: tablename,
        Item: input
    };
    try {
        await docClient.put(params).promise();
        return input;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const readDb = async(tablename, query) => {
    let params = {
        TableName: tablename,
        Key: query
    };
    try {
        let data = await docClient.get(params).promise();
        if (Object.keys(data.Item).length == 0) {
            return undefined;
        }
        return data.Item;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const scanDb = async(tablename, filterexpression, expressionvalue) => {
    let params;
    if (filterexpression != '') {
        params = {
            TableName: tablename,
            FilterExpression: filterexpression,
            ExpressionAttributeValues: expressionvalue
        };
    } else {
        params = {
            TableName: tablename
        };
    }
    try {
        let data = await docClient.scan(params).promise();
        return data.Items;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const deleteDb = async(tablename, query) => {
    let params = {
        TableName: tablename,
        Key: query
    };
    try {
        let data = await docClient.delete(params).promise();
        return data.Item;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

module.exports = {
    readDb,
    scanDb,
    insertDb,
    updateDb,
    deleteDb
}