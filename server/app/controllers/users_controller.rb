class UsersController < ApplicationController
  before_action :set_user, only: %i[show update edit destroy]
  before_action :authenticate_user!, only: %i[update edit destroy]

  def show
    videos = @user.videos.includes({ thumbnail_attachment: :blob }, { source_attachment: :blob })
    streams = @user.streams.where(streaming: true).includes({ thumbnail_attachment: :blob })
    authorize @user
    options = { params: { current_user: current_user } }
    render json: { videos: VideoSerializer.new(videos).serializable_hash,
                   user: UserSerializer.new(@user, options).serializable_hash,
                   streams: StreamSerializer.new(streams).serializable_hash }, status: :ok
  end

  def update
    authorize @user
    if @user.update(user_params)
      render json: UserSerializer.new(@user).serializable_hash, status: :ok
    else
      render json: { message: 'Unsuccessfully updated' }, status: :internal_server_error
    end
  end

  def edit
    authorize @user
    render json: UserSerializer.new(@user).serializable_hash, status: :ok
  end

  def destroy
    authorize @user
    if @user.destroy
      render json: { message: 'Deleted account' }, status: :ok
    else
      render json: { message: "Some thing went wrong, can't remove account" }, status: :internal_server_error
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:cover, :avatar, :name)
  end
end
