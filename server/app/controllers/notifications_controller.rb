class NotificationsController < ApplicationController
  def index
    render json: NotificationSerializer.new(current_user.notifications.limit(20).order(created_at: :desc)).serializable_hash, status: :ok
  end
end
