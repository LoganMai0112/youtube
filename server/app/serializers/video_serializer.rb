class VideoSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :id, :title, :description, :video_url, :thumbnail_url, :created_at, :status, :likes_count, :comments_count
  belongs_to :user

  attribute :liked_yet, if: proc { |_video, params|
                              params[:current_user].present?
                            } do |video, params|
    Like.find_by(video_id: video.id, user_id: params[:current_user].id)
  end
end
