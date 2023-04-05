class NotificationsBroadcastJob < ApplicationJob
  queue_as :default

  def perform(notification)
    ActionCable.server.broadcast "notification_channel:#{notification.receiver_id}", { notification: NotificationSerializer.new(notification).serializable_hash }
  end
end
