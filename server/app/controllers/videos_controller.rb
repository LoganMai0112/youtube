class VideosController < ApplicationController
  include Pagy::Backend
  before_action :authenticate_user!, only: %i[update create destroy recover]
  before_action :set_video, only: %i[show update destroy recover]

  def index
    pagy, videos = pagy(policy_scope(Video).all.includes({ user: [{ avatar_attachment: :blob }, { cover_attachment: :blob }] }, { thumbnail_attachment: :blob },
                                              { source_attachment: { blob: { preview_image_attachment: :blob } } }), page: params[:page], items: 12)
    options = { include: [:user] }
    render json: { videos: VideoSerializer.new(videos.to_a, options).serializable_hash, pagy: pagy }
  end

  def create
    video = Video.new(video_params)
    authorize video
    if video.save
      CreateNotificationsJob.perform_later(video: video, sender: current_user) if video.published?
      render json: VideoSerializer.new(video).serializable_hash[:data][:attributes], status: :created
    else
      render json: { message: 'Unsuccessfully created' }, status: :internal_server_error
    end
  end

  def show
    options = { include: [:user], params: { current_user: current_user } }
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
    if (current_user.user? && @video.really_destroy!) || (current_user.admin? && @video.destroy)
      render json: { message: 'Successfully deleted' }, status: :ok
    else
      render json: { message: 'Unsuccessfully deleted' }, status: :internal_server_error
    end
  end

  def recover
    if @video.restore
      render json: { message: 'Successfully restored' }, status: :ok
    else
      render json: { message: 'Unsuccessfully restored' }, status: :internal_server_error
    end
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :user_id, :source, :thumbnail, :status)
  end

  def set_video
    @video = Video.find(params[:id])
    authorize @video
  end
end
