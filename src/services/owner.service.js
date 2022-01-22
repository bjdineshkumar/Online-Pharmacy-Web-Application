const constants = require("../config/constants.config");
const emailService = require("../config/email.config");
const ownerDb = require("../db/owner.db");

const addOwner = async(owner) => {
    let { payload: isOwner } = await ownerDb.getOwnerByEmail(owner.email); {
        if (isOwner != undefined) {
            return { payload: undefined, message: "Owner already signed up" };
        }
    }
    const { payload, message } = await ownerDb.addOwner(owner);
    return { payload, message };
}

const updateOwner = async(owner) => {
    const { payload, message } = await ownerDb.updateOwner(owner);
    return { payload, message };
}

const getOwner = async(id) => {
    const { payload, message } = await ownerDb.getOwner(id);
    return { payload, message };
}

const deleteOwner = async(id) => {
    const { payload, message } = await ownerDb.deleteOwner(id);
    return { payload, message };
}

const forgotPasswordOwner = async(email) => {
    let { payload: owner } = await ownerDb.getOwnerByEmail(email);
    if (owner == undefined) {
        return { payload: undefined, message: "Owner not found" };
    }
    let resettedPassword = owner.storeName;
    owner["password"] = Buffer.from(resettedPassword).toString('base64');
    await ownerDb.updateOwner(owner);
    await emailService.sendEmail(constants.APP_MAIL_ID, owner['email'], constants.APP_MAIL_FORGOT_PASSWORD, "New Password : " + resettedPassword);
    return { payload: email, message: "Password reset successful" };
}

module.exports = {
    addOwner,
    updateOwner,
    getOwner,
    deleteOwner,
    forgotPasswordOwner
}