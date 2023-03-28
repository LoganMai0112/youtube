class SearchsController < ApplicationController
  def search
    results = case params[:type]
              when 'video'
                case params[:date]
                when 'hour'
                  VideoSerializer.new(Video.search(params[:query], where: { status: 'published', created_at: { gte: 1.hour.ago } }).includes(:user).to_a, { include: [:user] }).serializable_hash
                when 'day'
                  VideoSerializer.new(Video.search(params[:query], where: { status: 'published', created_at: { gte: 1.day.ago } }).includes(:user).to_a, { include: [:user] }).serializable_hash
                when 'week'
                  VideoSerializer.new(Video.search(params[:query], where: { status: 'published', created_at: { gte: 1.week.ago } }).includes(:user).to_a, { include: [:user] }).serializable_hash
                when 'month'
                  VideoSerializer.new(Video.search(params[:query], where: { status: 'published', created_at: { gte: 1.month.ago } }).includes(:user).to_a, { include: [:user] }).serializable_hash
                when 'year'
                  VideoSerializer.new(Video.search(params[:query], where: { status: 'published', created_at: { gte: 1.year.ago } }).includes(:user).to_a, { include: [:user] }).serializable_hash
                else
                  VideoSerializer.new(Video.search(params[:query], where: { status: 'published' }).includes(:user).to_a, { include: [:user] }).serializable_hash
                end
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
