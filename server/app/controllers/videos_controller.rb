class VideosController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def create
    video = Video.new(video_params)
    if video.save
      render json: VideoSerializer.new(video).serializable_hash[:data][:attributes], status: :created
    else
      byebug
      render json: {message: "Unsuccessfully created"}, status: 500
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :user_id, :source)
  end
end
