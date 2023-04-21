class LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_like, only: %i[destroy]

  def create
    like = Like.where(video_id: params[:video_id], user_id: current_user.id).first_or_initialize
    authorize like
    if like.save
      render json: like, status: :created
    else
      render json: { message: 'Fail to like video' }, status: :internal_server_error
    end
  end

  def destroy
    authorize @like
    if @like.destroy
      render json: { message: 'Successfully destroyed' }, status: :ok
    else
      render json: { message: 'Unsuccessfully destroyed' }, status: :internal_server_error
    end
  end

  private

  def set_like
    @like = Like.find_by(video_id: params[:video_id], user_id: current_user.id)
  end
end
