class UserSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :id, :email, :created_at, :name, :avatar_url, :cover_url

  attribute :subscribers_count do |object|
    object.subscribers.count
  end

  attribute :subscribed_yet, if: proc { |_user, params|
                                   params[:current_user].present?
                                 } do |user, params|
    Subscribe.find_by(subscriber_id: params[:current_user].id, subscribed_id: user.id)
  end
end
