class VideosController < ApplicationController
  before_action :authenticate_user!, only: %i[edit create destroy]

  def index
    videos = Video.all
    options = {include: [:user]}
    render json: VideoSerializer.new(videos, options).serializable_hash
  end

  def create
    video = Video.new(video_params)
    if video.save
      render json: VideoSerializer.new(video).serializable_hash[:data][:attributes], status: :created
    else
      render json: {message: "Unsuccessfully created"}, status: 500
    end
  end

  def edit
  end

  def destroy
  end
  
  private

  def video_params
    params.require(:video).permit(:title, :description, :user_id, :source)
  end
end
