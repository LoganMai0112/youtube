class StreamSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :user_id, :title, :description, :id, :thumbnail_url, :streaming
  belongs_to :user
end
