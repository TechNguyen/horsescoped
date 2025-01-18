const mongoose = require("mongoose");
const AppRole = require("../AppRole");

const roleSeeds = [
    {
        name: "Administrator",
        roleCode: "ADMIN",
        description: "Full system access and control",
    },
    {
        name: "User",
        roleCode: "USER",
        description: "Standard user access",
    },
    {
        name: "Guest",
        roleCode: "GUEST",
        description: "Limited access to the system",
    },
];

const seedRoles = async () => {
    try {
        // Clear existing roles
        await AppRole.deleteMany({});
        // Insert new roles
        const createdRoles = await AppRole.insertMany(roleSeeds);
        console.log("Roles seeded successfully:", createdRoles);
    } catch (error) {
        console.error("Error seeding roles:", error);
    }
};

module.exports = seedRoles;
