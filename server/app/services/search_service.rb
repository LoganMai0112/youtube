class SearchService < ApplicationService
  include Pagy::Backend

  def initialize(type, query, date_params, page, current_user, params)
    @type = type
    @query = query
    @date_params = date_params
    @page = page
    @current_user = current_user
    @params = params
  end

  attr_reader :params

  def call
    case @type
    when 'video'
      results = Video.pagy_search(@query, where: { status: 'published', deleted_at: nil, created_at: { gte: @date_params } }).includes(
        { source_attachment: { blob: { preview_image_attachment: :blob } } }, { thumbnail_attachment: :blob }, :user
      )
      pagy, response = pagy_searchkick(results, items: 10)
      { data: VideoSerializer.new(response.to_a, { include: [:user] }).serializable_hash, pagy: pagy }
    when 'channel'
      results = User.pagy_search(@query, where: { deleted_at: nil })
      pagy, response = pagy_searchkick(results, items: 10)
      { data: UserSerializer.new(response.to_a, params: { current_user: current_user }).serializable_hash, pagy: pagy }
    when 'playlist'
      results = Playlist.pagy_search(@query, where: { status: 'published' })
      pagy, response = pagy_searchkick(results, items: 10)
      { data: PlaylistSerializer.new(response.to_a).serializable_hash, pagy: pagy }
    end
  end
end
