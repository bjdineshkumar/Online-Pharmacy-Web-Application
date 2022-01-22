const dbConfig = require("../config/db.config");

const addCustomer = async(customer) => {
    try {
        let date = new Date();
        let customerId = "C" + date.getTime();
        customer["customerId"] = customerId;
        let insertCustomer = await dbConfig.insertDb("customer", customer);
        if (insertCustomer == undefined) {
            return { "payload": insertCustomer, "message": "Error in adding customer" };
        }
        return { "payload": insertCustomer, "message": "Customer added successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const updateCustomer = async(customer) => {
    try {
        await dbConfig.updateDb("customer", customer);
        let updateCustomer = await dbConfig.readDb("customer", { customerId: customer.customerId });
        return { "payload": updateCustomer, "message": "Customer updated successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getCustomer = async(id) => {
    try {
        let customer = await dbConfig.readDb("customer", { customerId: id + "" })
        if (customer == undefined) {
            return { "payload": undefined, "message": "Customer not found" };
        }
        return { "payload": customer, "message": "Customer found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getCustomerByEmail = async(email) => {
    try {
        let customer = await dbConfig.scanDb("customer", 'email = :email', { ":email": email })
        if (customer.length == 0) {
            return { "payload": undefined, "message": "Customer not found" };
        }
        return { "payload": customer[0], "message": "Customer found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const deleteCustomer = async(id) => {
    try {
        await dbConfig.deleteDb("customer", { customerId: id + "" })
        return { "payload": { customerId: id + "" }, "message": "Customer deleted successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

module.exports = {
    addCustomer,
    getCustomer,
    getCustomerByEmail,
    updateCustomer,
    deleteCustomer
}