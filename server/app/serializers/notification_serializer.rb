class NotificationSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :content, :notifiable_id, :notifiable_type, :user_id, :created_at

  attribute :avatar_url do |notification|
    notification.user.avatar_url
  end

  attribute :thumbnail_url do |notification|
    notification.notifiable.thumbnail_url
  end
end
