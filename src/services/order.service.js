const AWS = require("aws-sdk");
const constants = require("../config/constants.config");
const email = require("../config/email.config");
const ownerDb = require("../db/owner.db");
const orderDb = require("../db/order.db");
const productDb = require("../db/product.db");
const jwtService = require("../services/jwt.service");

const awsConfig = {
    "region": constants.AWS_REGION,
    "accessKeyId": constants.AWS_ACCESS_KEY_ID,
    "secretAccessKey": constants.AWS_SECRET_KEY,
    "sessionToken": constants.AWS_SESSION_TOKEN
};

AWS.config.update(awsConfig);

const addOrder = async(cart, token) => {
    let customer = jwtService.decodeToken(token);
    let orders = Object.values(cart);
    let orderMessageCustomer = constants.PLACE_ORDER_MESSAGE;
    let orderMessageOwner = constants.RECEIVE_ORDER_MESSAGE;
    let ownerOrders = new Map();
    for (let index = 0; index < orders.length; index++) {
        let order = orders[index];
        let date = new Date();
        let orderId = "OD" + date.getTime();
        let { payload: product } = await productDb.getProduct(order["productId"]);
        order["orderId"] = orderId;
        order["productName"] = product["productName"];
        order["customerId"] = customer["customerId"];
        order["ownerId"] = product["ownerId"];
        order["status"] = "PLACED";
        order["totalPrice"] = parseFloat(product["price"]) * parseFloat(order["qty"]);
        order["city"] = customer["city"];
        order["country"] = customer["country"];
        order["orderDate"] = date.getTime() + "";
        orderMessageCustomer = orderMessageCustomer + ">>" + " " + product["productName"] + "\n";
        if (ownerOrders.has(product["ownerId"])) {
            orderMessageOwner = ownerOrders.get(product["ownerId"]);
            orderMessageOwner = orderMessageOwner + ">>" + " " + product["productName"] + "\n";
        } else {
            orderMessageOwner = constants.RECEIVE_ORDER_MESSAGE;
            orderMessageOwner = orderMessageOwner + ">>" + " " + product["productName"] + "\n";
        }
        ownerOrders.set(product["ownerId"], orderMessageOwner);
    }

    orderMessageCustomer = orderMessageCustomer + constants.THANK_MESSAGE;
    let customerOrderParams = {
        Message: orderMessageCustomer,
        TopicArn: constants.AWS_TOPIC
    };
    let publishCustomerPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(customerOrderParams).promise();
    publishCustomerPromise.then((data) => {}).catch((error) => {
        console.log(error);
    });
    await email.sendEmail(constants.APP_MAIL_ID, customer['email'], constants.APP_MAIL_SUBJECT, orderMessageCustomer);

    for (const [key, value] of ownerOrders.entries()) {
        let { payload: owner } = await ownerDb.getOwner(key);
        await email.sendEmail(constants.APP_MAIL_ID, owner['email'], constants.APP_MAIL_SUBJECT, value);
        console.log(key, value);
    }

    const { payload, message } = await orderDb.addOrder(orders);
    return { payload, message };
}

const updateOrder = async(order) => {
    const { payload, message } = await orderDb.updateOrder(order);
    return { payload, message };
}

const getOrder = async(id) => {
    const { payload, message } = await orderDb.getOrder(id);
    return { payload, message };
}

const getOrdersByOwnerId = async(ownerid) => {
    const { payload, message } = await orderDb.getOrdersByOwnerId(ownerid);
    return { payload, message };
}

const getOrdersByCustomerId = async(customerid) => {
    const { payload, message } = await orderDb.getOrdersByCustomerId(customerid);
    return { payload, message };
}

module.exports = {
    addOrder,
    updateOrder,
    getOrder,
    getOrdersByCustomerId,
    getOrdersByOwnerId
}