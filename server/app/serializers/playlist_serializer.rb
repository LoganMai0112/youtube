class PlaylistSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :title, :description, :status, :created_at, :updated_at, :thumbnail_url

  attribute :added, if: proc { |_playlist, params|
                          params[:video_id].present?
                        } do |playlist, params|
    PlaylistItem.find_by(playlist: playlist, video_id: params[:video_id]).present?
  end

  attribute :created_or_saved, if: proc { |_playlist, params|
                                     params[:current_user].present?
                                   } do |playlist, params|
    UserPlaylist.find_by(playlist: playlist, user: params[:current_user])&.action
  end
end
