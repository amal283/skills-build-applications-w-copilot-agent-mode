"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
        ]);
        const users = await user_1.default.insertMany([
            { name: 'Ava Chen', email: 'ava@example.com', role: 'captain', fitnessGoal: 'Marathon prep' },
            { name: 'Noah Patel', email: 'noah@example.com', role: 'member', fitnessGoal: 'Strength gain' },
            { name: 'Mina Lopez', email: 'mina@example.com', role: 'member', fitnessGoal: 'Improve endurance' },
        ]);
        await team_1.default.insertMany([
            { name: 'Velocity', sport: 'Running', members: 8, captain: users[0].name },
            { name: 'Summit', sport: 'Cycling', members: 6, captain: users[1].name },
        ]);
        await activity_1.default.insertMany([
            { type: 'Run', durationMinutes: 35, calories: 320, userId: users[0]._id.toString() },
            { type: 'Yoga', durationMinutes: 25, calories: 180, userId: users[1]._id.toString() },
            { type: 'Cycling', durationMinutes: 45, calories: 410, userId: users[2]._id.toString() },
        ]);
        await leaderboard_1.default.insertMany([
            { userId: users[0]._id.toString(), points: 980, rank: 1 },
            { userId: users[1]._id.toString(), points: 870, rank: 2 },
            { userId: users[2]._id.toString(), points: 810, rank: 3 },
        ]);
        await workout_1.default.insertMany([
            { name: 'Tempo Run', intensity: 'High', durationMinutes: 40, target: 'Cardio' },
            { name: 'Mobility Flow', intensity: 'Low', durationMinutes: 20, target: 'Recovery' },
            { name: 'Strength Circuit', intensity: 'Medium', durationMinutes: 35, target: 'Full Body' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
