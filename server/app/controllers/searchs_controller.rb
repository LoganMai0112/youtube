class SearchsController < ApplicationController
  include Pagy::Backend

  def search
    results = case params[:type]
              when 'video'
                results = Video.pagy_search(params[:query], where: { status: 'published', deleted_at: nil, created_at: { gte: date_params } })
                pagy, response = pagy_searchkick(results, items: 10)
                { data: VideoSerializer.new(response.to_a, { include: [:user] }).serializable_hash, pagy: pagy }
              when 'channel'
                results = User.pagy_search(params[:query], where: { deleted_at: nil })
                pagy, response = pagy_searchkick(results, items: 10)
                { data: UserSerializer.new(response.to_a, params: { current_user: current_user }).serializable_hash, pagy: pagy }
              when 'playlist'
                results = Playlist.pagy_search(params[:query], where: { status: 'published' }, page: params[:page], per_page: 10)
                pagy, response = pagy_searchkick(results)
                { data: PlaylistSerializer.new(response.to_a).serializable_hash, pagy: pagy }
              end

    if results
      render json: results, status: :ok
    else
      render json: { message: 'Some thing went wrong' }, status: :internal_server_error
    end
  end

  private

  def date_params
    if %w[hour day week month year].include?(params[:date])
      1.send(params[:date]).ago
    else
      1.month.ago
    end
  end
end
