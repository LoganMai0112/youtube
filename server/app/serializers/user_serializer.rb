class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :created_at, :name, :avatar_url
end
