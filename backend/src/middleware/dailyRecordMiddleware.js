const dailyRecordService = require("../services/dailyRecordService");

const dailyRecordMiddleware = async (req, res, next) => { 

    try { 
        const today = new Date().toISOString().split('T')[0]; 
        const userId = req.user?.id;  

        if (!userId) {
            return res.status(401).json({ error: "User authentication required." });
        }

        // Check if a daily record exists for this user and date 
        let dailyRecord = await dailyRecordService.getDailyRecordByIdAndDate(userId, today);

        // Create the daily record if it doesn't exist 
        if (!dailyRecord || dailyRecord.length === 0) {
            dailyRecord = await dailyRecordService.createDailyRecord(today, userId);
        }

        // Attach the daily record to the request object for later user 
        req.dailyRecord = dailyRecord;

        next(); // pass control to the next middleware 
    } 
    catch (error) { 
        return res.status(500).json({error: "Error processing daily record."})
    }
};

module.exports = dailyRecordMiddleware;
