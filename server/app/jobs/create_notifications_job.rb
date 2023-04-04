class CreateNotificationsJob < ApplicationJob
  queue_as :default

  def perform(video: nil, stream: nil, sender: nil)
    if video.present?
      NotificationsForVideoService.call(video, sender)
    else
      NotificationsForStreamService.call(stream, sender)
    end
  end
end
