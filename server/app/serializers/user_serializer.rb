class UserSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :id, :email, :created_at, :name, :avatar_url
end
