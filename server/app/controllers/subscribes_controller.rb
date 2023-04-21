class SubscribesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_subscribe, only: %i[destroy]
  def create
    subscribe = Subscribe.where(subscriber_id: current_user.id, subscribed_id: params[:user_id]).first_or_initialize
    authorize subscribe
    if subscribe.save
      render json: subscribe, status: :created
    else
      render json: { message: 'Subscribe failed' }, status: :internal_server_error
    end
  end

  def destroy
    authorize @subscribe
    if @subscribe.destroy
      render json: { message: 'Successfully unsubscribed' }, status: :ok
    else
      render json: { message: 'Unsuccessfully unsubscribed' }, status: :internal_server_error
    end
  end

  private

  def set_subscribe
    @subscribe = Subscribe.find_by(subscriber_id: current_user.id, subscribed_id: params[:user_id])
  end
end
