class VideosController < ApplicationController
  before_action :authenticate_user!, only: %i[edit create destroy]
  before_action :set_video, only: %i[show update destroy]

  def index
    videos = Video.all
    options = { include: [:user] }
    render json: VideoSerializer.new(videos, options).serializable_hash
  end

  def create
    video = Video.new(video_params)
    if video.save
      render json: VideoSerializer.new(video).serializable_hash[:data][:attributes], status: :created
    else
      render json: { message: 'Unsuccessfully created' }, status: :internal_server_error
    end
  end

  def show
    options = { include: [:user] }
    render json: VideoSerializer.new(@video, options).serializable_hash
  end

  def update
    if @video.update(video_params)
      render json: VideoSerializer.new(@video).serializable_hash[:data][:attributes], status: :accepted
    else
      render json: { message: 'Unsuccesfully updated' }, status: internal_server_error
    end
  end

  def destroy
    if @video.destroy
      render json: { message: 'successfully deleted' }, status: :ok
    else
      render json: { message: 'Unsuccessfully deleted' }, status: internal_server_error
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :user_id, :source, :thumbnail)
  end

  def set_video
    @video = Video.find(params[:id])
  end
end
