class NotificationsController < ApplicationController
  before_action :set_notification, only: :update

  def index
    render json: NotificationSerializer.new(current_user.notifications.limit(20).order(created_at: :desc)).serializable_hash, status: :ok
  end

  def update
    if @notification.update(notification_params)
      render json: @notification, status: :ok
    else
      render json: { message: "Can't read notification" }, status: :internal_server_error
    end
  end

  private

  def notification_params
    params.require(:notification).permit(:read)
  end

  def set_notification
    @notification = Notification.find(params[:id])
    authorize @notification
  end
end
