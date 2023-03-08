class LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_like, only: %i[destroy show]

  def show
    render json: @like, status: :ok
  end

  def create
    like = Like.new(video_id: params[:video_id], user_id: current_user.id)
    if like.save
      render json: like, status: :created
    else
      render json: { message: 'Fail to like video' }, status: :internal_server_error
    end
  end

  def destroy
    if @like.destroy
      render json: { status: 'Successfully destroyed' }, status: :ok
    else
      render json: { status: 'Unsuccessfully destroyed' }, status: :internal_server_error
    end
  end

  private

  def set_like
    @like = Like.find_by(video_id: params[:video_id], user_id: current_user.id)
  end
end
