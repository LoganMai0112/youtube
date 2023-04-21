class NotificationsForVideoService < ApplicationService
  def initialize(video, sender)
    @video = video
    @sender = sender
  end

  def call
    @sender.subscribers.each do |subscriber|
      Notification.create(user: @sender, receiver_id: subscriber.id, content: "#{@sender.name} uploaded: #{@video.title}", notifiable: @video)
    end
  end
end
