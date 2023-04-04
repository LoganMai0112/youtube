class NotificationsForStreamService < ApplicationService
  def initialize(stream, sender)
    @stream = stream
    @sender = sender
  end

  def call
    @sender.subscribers.each do |subscriber|
      Notification.create(user: @sender, receiver_id: subscriber.id, content: "#{@sender.name} is live streaming with topic #{@stream.title}", notifiable: @stream)
    end
  end
end
