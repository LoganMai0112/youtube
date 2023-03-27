class UsersController < ApplicationController
  before_action :set_user, only: %i[show update edit destroy]
  before_action :authenticate_user!, only: %i[update edit destroy]

  def show
    videos = policy_scope(@user.videos.includes({ thumbnail_attachment: :blob }, { source_attachment: { blob: :preview_image_attachment } }))
    streams = @user.streams.where(streaming: true).includes({ thumbnail_attachment: :blob })
    created_playlists = if @user == current_user
                          policy_scope(Playlist).joins(user_playlists: :user).where(user_playlists: { action: 'created' },
                                                                                    user: { id: @user.id })
                        else
                          policy_scope(Playlist).joins(user_playlists: :user).where(
                            user_playlists: { action: 'created' }, user: { id: @user.id }
                          ).published
                        end
    saved_playlists = policy_scope(Playlist).joins(user_playlists: :user).where(user_playlists: { action: 'saved' }, user: { id: @user.id })
    options = { params: { current_user: current_user } }
    playlist_options = { include: [:videos] }

    render json: { videos: VideoSerializer.new(videos).serializable_hash,
                   user: UserSerializer.new(@user, options).serializable_hash,
                   streams: StreamSerializer.new(streams).serializable_hash,
                   createdPlaylists: PlaylistSerializer.new(created_playlists, playlist_options).serializable_hash,
                   savedPlaylists: PlaylistSerializer.new(saved_playlists).serializable_hash }, status: :ok
  end

  def update
    if @user.update(user_params)
      render json: UserSerializer.new(@user).serializable_hash, status: :ok
    else
      render json: { message: 'Unsuccessfully updated' }, status: :internal_server_error
    end
  end

  def edit
    render json: UserSerializer.new(@user).serializable_hash, status: :ok
  end

  def destroy
    if @user.destroy
      render json: { message: 'Deleted account' }, status: :ok
    else
      render json: { message: "Some thing went wrong, can't remove account" }, status: :internal_server_error
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
    authorize @user
  end

  def user_params
    params.require(:user).permit(:cover, :avatar, :name)
  end
end
