const constants = require("../config/constants.config");
const emailService = require("../config/email.config");
const customerDb = require("../db/customer.db");

const addCustomer = async(customer) => {
    let { payload: isCustomer } = await customerDb.getCustomerByEmail(customer.email); {
        if (isCustomer != undefined) {
            return { payload: undefined, message: "Customer already signed up" };
        }
    }
    const { payload, message } = await customerDb.addCustomer(customer);
    return { payload, message };
}

const updateCustomer = async(customer) => {
    const { payload, message } = await customerDb.updateCustomer(customer);
    return { payload, message };
}

const getCustomer = async(id) => {
    const { payload, message } = await customerDb.getCustomer(id);
    return { payload, message };
}

const deleteCustomer = async(id) => {
    const { payload, message } = await customerDb.deleteCustomer(id);
    return { payload, message };
}

const forgotPasswordCustomer = async(email) => {
    let { payload: customer } = await customerDb.getCustomerByEmail(email);
    if (customer == undefined) {
        return { payload: undefined, message: "Customer not found" };
    }
    let resettedPassword = customer.firstName;
    customer["password"] = Buffer.from(resettedPassword).toString('base64');
    await customerDb.updateCustomer(customer);
    await emailService.sendEmail(constants.APP_MAIL_ID, customer['email'], constants.APP_MAIL_FORGOT_PASSWORD, "New Password : " + resettedPassword);
    return { payload: email, message: "Password reset successful" };
}

module.exports = {
    addCustomer,
    updateCustomer,
    getCustomer,
    deleteCustomer,
    forgotPasswordCustomer
}