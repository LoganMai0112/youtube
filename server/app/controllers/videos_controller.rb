class VideosController < ApplicationController
  before_action :authenticate_user!, only: %i[update create destroy]
  before_action :set_video, only: %i[show update destroy]

  def index
    videos = policy_scope(Video).all.includes({ user: [{ avatar_attachment: :blob }, :cover_attachment] }, { thumbnail_attachment: :blob },
                                             { source_attachment: { blob: { preview_image_attachment: :blob } } })
    options = { include: [:user] }
    render json: VideoSerializer.new(videos, options).serializable_hash
  end

  def create
    video = Video.new(video_params)
    authorize video
    if video.save
      render json: VideoSerializer.new(video).serializable_hash[:data][:attributes], status: :created
    else
      render json: { message: 'Unsuccessfully created' }, status: :internal_server_error
    end
  end

  def show
    authorize @video
    options = { include: [:user], params: { current_user: current_user } }
    render json: VideoSerializer.new(@video, options).serializable_hash
  end

  def update
    authorize @video
    if @video.update(video_params)
      render json: VideoSerializer.new(@video).serializable_hash[:data][:attributes], status: :accepted
    else
      render json: { message: 'Unsuccesfully updated' }, status: internal_server_error
    end
  end

  def destroy
    authorize @video
    if @video.destroy
      render json: { message: 'successfully deleted' }, status: :ok
    else
      render json: { message: 'Unsuccessfully deleted' }, status: internal_server_error
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :user_id, :source, :thumbnail, :status)
  end

  def set_video
    @video = Video.find(params[:id])
  end
end
