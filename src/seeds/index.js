const mongoose = require("mongoose");
const seedRoles = require("../models/seeds/initRoleSeeds");
const dotenv = require("dotenv");
dotenv.config();

const runSeeders = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error(
                "MONGODB_URI is not defined in environment variables",
            );
        }
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await seedRoles();
        console.log("All seeds completed successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error running seeds:", error);
        process.exit(1);
    }
};

runSeeders();
