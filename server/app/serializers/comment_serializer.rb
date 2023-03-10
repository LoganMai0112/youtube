class CommentSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :id, :content, :user_id, :created_at, :video_id

  belongs_to :user
end
