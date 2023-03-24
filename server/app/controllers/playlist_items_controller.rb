class PlaylistItemsController < ApplicationController
  before_action :authenticate_user!

  def create
    playlist_item = PlaylistItem.new(playlist_id: params[:playlist_id], video_id: params[:video_id])
    authorize playlist_item

    if playlist_item.save
      render json: playlist_item, status: :ok
    else
      render json: { message: "Can't add this video to your playlist" }, status: :internal_server_error
    end
  end

  def destroy
    playlist_item = PlaylistItem.find_by(playlist_id: params[:playlist_id], video_id: params[:video_id])
    authorize playlist_item

    if playlist_item.destroy
      render json: { message: 'Removed video from the playlist' }, status: :ok
    else
      render json: { message: "Can't remove video from the playlist" }, status: :internal_server_error
    end
  end
end
