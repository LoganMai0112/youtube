class VideoController < ApplicationController
  def index
    render json: Video.all
  end

  def create
    video = Video.create(video_params)
    render json: video, status: :created
  end

  def show
    video = Video.find(:id)
    render json: video, status: :success
  end

  private

  def video_params
    params.permit(:title, :description, :source, :user_id)
  end
end
