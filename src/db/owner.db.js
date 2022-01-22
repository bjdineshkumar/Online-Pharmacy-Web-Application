const dbConfig = require("../config/db.config");

const addOwner = async(owner) => {
    try {
        let date = new Date();
        let ownerId = "ON" + date.getTime();
        owner["ownerId"] = ownerId;
        let insertOwner = await dbConfig.insertDb("owner", owner);
        if (insertOwner == undefined) {
            return { "payload": insertOwner, "message": "Error in adding owner" };
        }
        return { "payload": insertOwner, "message": "Owner added successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const updateOwner = async(owner) => {
    try {
        await dbConfig.updateDb("owner", owner);
        let updateOwner = await dbConfig.readDb("owner", { ownerId: owner.ownerId });
        return { "payload": updateOwner, "message": "Owner updated successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getOwner = async(id) => {
    try {
        let owner = await dbConfig.readDb("owner", { ownerId: id + "" })
        if (owner == undefined) {
            return { "payload": undefined, "message": "Owner not found" };
        }
        return { "payload": owner, "message": "Owner found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const getOwnerByEmail = async(email) => {
    try {
        let owner = await dbConfig.scanDb("owner", 'email = :email', { ":email": email })
        if (owner.length == 0) {
            return { "payload": undefined, "message": "Owner not found" };
        }
        return { "payload": owner[0], "message": "Owner found successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

const deleteOwner = async(id) => {
    try {
        await dbConfig.deleteDb("owner", { ownerId: id + "" })
        return { "payload": { ownerId: id + "" }, "message": "Owner deleted successfully" };
    } catch (error) {
        console.error(error);
        return { "payload": undefined, "message": error.message };
    }
}

module.exports = {
    addOwner,
    updateOwner,
    getOwner,
    getOwnerByEmail,
    deleteOwner
}