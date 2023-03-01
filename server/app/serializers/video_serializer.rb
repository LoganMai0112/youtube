class VideoSerializer
  include JSONAPI::Serializer
  attributes :"title,", :"description,", :video_url
end
