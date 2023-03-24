class PlaylistsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_playlist, only: %i[update destroy]

  def index
    playlists = policy_scope(current_user.playlists)
    options = { params: { video_id: params[:video_id] } }

    render json: PlaylistSerializer.new(playlists, options), status: :ok
  end

  def create
    playlist = Playlist.new(playlist_params)
    authorize playlist

    if playlist.save && UserPlaylist.new(user: current_user, playlist: playlist, action: 'created').save
      render json: playlist, status: :created
    else
      render json: { message: "Can't create playlist, please try again later" }, status: :internal_server_error
    end
  end

  def update
    if @playlist.update(playlist_params)
      render json: playlist, status: :ok
    else
      render json: { message: "Can't not update playlist" }, status: :internal_server_error
    end
  end

  def destroy
    if @playlist.destroy
      render json: { message: 'Playlist deleted' }, status: :ok
    else
      render json: { message: 'Unsuccessfully deleted' }, status: :internal_server_error
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :description, :status)
  end

  def set_playlist
    @playlist = Playlist.find(:id)
    authorize @playlist
  end
end
