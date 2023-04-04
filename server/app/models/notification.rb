class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :receiver, class_name: 'User'
  belongs_to :notifiable, polymorphic: true

  after_create :send_notification

  def send_notification
    NotificationsBroadcastJob.perform_later(self)
  end
end
