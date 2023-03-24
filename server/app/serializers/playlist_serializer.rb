class PlaylistSerializer
  include JSONAPI::Serializer
  attributes :title, :description, :status

  attribute :added, if: proc { |_playlist, params|
                          params[:video_id].present?
                        } do |playlist, params|
    PlaylistItem.find_by(playlist: playlist, video_id: params[:video_id]).present?
  end
end
