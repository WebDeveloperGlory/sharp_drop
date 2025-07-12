const db = require('../config/db');

exports.retrieveAllNotifications = async ({ userId }) => {
    // Get all notifications for a user
    const notifications = await db.Notification.find({ userId })
        .sort({ createdAt: -1 }) // Sort by creation date, newest first

    // Return success
    return { success: true, message: 'Notifications Retrieved', data: notifications };
};

exports.markNotificationAsRead = async ({ notificationId }, { userId }) => {
    // Find the notification by ID and userId
    const notification = await db.Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { isRead: true },
        { new: true } // Return the updated document
    );
    // If notification not found, return error
    if (!notification) {
        return { success: false, message: 'Notification not found or already read' };
    }

    // Return success
    return { success: true, message: 'Notification marked as read', data: notification };
};

exports.markAllNotificationsAsRead = async ({ userId }) => {
    // Update all notifications for the user to mark them as read
    const result = await db.Notification.updateMany(
        { userId, isRead: false }, // Only update unread notifications
        { isRead: true }
    );

    // Return success
    return { success: true, message: 'All notifications marked as read', data: result };
};

module.exports = exports;