class SearchsController < ApplicationController
  include Pagy::Backend

  def search
    results = case params[:type]
              when 'video'
                results = Video.pagy_search(params[:query], where: { status: 'published', deleted_at: nil, created_at: { gte: date_params } }).includes(:user)
                byebug
                VideoSerializer.new(results, { include: [:user] }).serializable_hash
              when 'channel'
                results = User.pagy_search(params[:query], where: { deleted_at: nil }, page: params[:page], per_page: 10)
                _, response = pagy_searchkick(results)
                UserSerializer.new(response.to_a, params: { current_user: current_user }).serializable_hash
              when 'playlist'
                results = Playlist.pagy_search(params[:query], where: { status: 'published' }, page: params[:page], per_page: 10)
                _, response = pagy_searchkick(results)
                PlaylistSerializer.new(response.to_a).serializable_hash
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
