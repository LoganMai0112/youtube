class SearchsController < ApplicationController
  def search
    results = case params[:type]
              when 'video'
                VideoSerializer.new(Video.search(params[:query], where: 1.send(params[:date]).ago).includes(:user).to_a, { include: [:user] }).serializable_hash
              when 'channel'
                UserSerializer.new(User.search(params[:query]).to_a, params: { current_user: current_user }).serializable_hash
              when 'playlist'
                PlaylistSerializer.new(Playlist.search(params[:query], where: { status: 'published' }).to_a).serializable_hash
              end

    if results
      render json: results, status: :ok
    else
      render json: { message: 'Some thing went wrong' }, status: :internal_server_error
    end
  end
end
