const dbConfig = require("../config/db.config");

const addOrder = async(orders) => {
    try {
        orders.forEach(async(order) => {
            await dbConfig.insertDb("order", order);
        });
        return { "payload": orders, "message": "Order added successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const updateOrder = async(order) => {
    try {
        await dbConfig.updateDb("order", order);
        let updateOrder = await dbConfig.readDb("order", { orderId: order.orderId });
        return { "payload": updateOrder, "message": "Order updated successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getOrder = async(id) => {
    try {
        let order = await dbConfig.readDb("order", { orderId: id + "" })
        if (order == undefined) {
            return { "payload": order, "message": "Order not found" };
        }
        return { "payload": order, "message": "Order found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getOrdersByOwnerId = async(ownerid) => {
    try {
        let orders = await dbConfig.scanDb("order", 'ownerId = :ownerId', { ":ownerId": ownerid + "" })
        if (orders == undefined) {
            return { "payload": orders, "message": "Orders not found" };
        }
        return { "payload": orders, "message": "Orders found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getOrdersByCustomerId = async(customerid) => {
    try {
        let orders = await dbConfig.scanDb("order", 'customerId = :customerId', { ":customerId": customerid + "" })
        if (orders == undefined) {
            return { "payload": orders, "message": "Orders not found" };
        }
        return { "payload": orders, "message": "Orders found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

module.exports = {
    addOrder,
    updateOrder,
    getOrder,
    getOrdersByCustomerId,
    getOrdersByOwnerId
}