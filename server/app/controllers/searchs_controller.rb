class SearchsController < ApplicationController
  def search
    videos = Video.search(params[:query])
    byebug

    if videos
      render json: VideoSerializer.new(videos).serializable_hash
    else
      render json: { message: 'Some thing went wrong' }, status: :internal_server_error
    end
  end
end
