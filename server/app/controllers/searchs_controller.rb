class SearchsController < ApplicationController
  def search
    videos = policy_scope(Video.search(params[:query]))
    if videos
      options = { include: [:user] }
      serialized_videos = videos.map { |video| VideoSerializer.new(video, options).serializable_hash}
      render json: serialized_videos.to_json, status: :ok
    else
      render json: { message: 'Some thing went wrong' }, status: :internal_server_error
    end
  end
end
