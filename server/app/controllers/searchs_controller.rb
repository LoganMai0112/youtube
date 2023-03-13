class SearchsController < ApplicationController
  def search
    videos = policy_scope(Video.search(params[:query]))
    if videos
      options = { include: [:user] }
      render json: VideoSerializer.new(videos.to_a, options).serializable_hash, status: :ok
    else
      render json: { message: 'Some thing went wrong' }, status: :internal_server_error
    end
  end
end
