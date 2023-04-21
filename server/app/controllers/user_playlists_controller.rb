class UserPlaylistsController < ApplicationController
  before_action :authenticate_user!

  def create
    saved = UserPlaylist.new(user: current_user, playlist_id: params[:playlist_id], action: 'saved')
    authorize saved
    if saved.save
      render json: saved, status: :ok
    else
      render json: { message: "Can't save this playlist to your library" }, status: :internal_server_error
    end
  end

  def destroy
    saved = UserPlaylist.find_by(user: current_user, playlist_id: params[:playlist_id], action: 'saved')
    authorize saved
    if saved.destroy
      render json: { message: 'Removed this playlist from your library' }, status: :ok
    else
      render json: { message: "Can't remove this playlist from your library" }, status: :internal_server_error
    end
  end
end
