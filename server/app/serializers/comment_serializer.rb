class CommentSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :id, :content, :user_id, :created_at

  belongs_to :user
end
