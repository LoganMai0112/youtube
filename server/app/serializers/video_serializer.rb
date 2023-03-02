class VideoSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :title, :description, :video_url
  belongs_to :user
end
