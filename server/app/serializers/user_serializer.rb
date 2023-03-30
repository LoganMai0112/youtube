class UserSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :id, :email, :created_at, :name, :avatar_url, :cover_url, :role

  attribute :subscribers_count do |object|
    object.subscribers.size
  end

  attribute :subscribed_yet, if: proc { |_user, params|
                                   params[:current_user].present?
                                 } do |user, params|
    Subscribe.find_by(subscriber_id: params[:current_user].id, subscribed_id: user.id)
  end

  attribute :deleted_yet, if: proc { |_user, params|
                                params[:current_user]&.admin?
                              } do |user, _|
    user&.deleted?
  end
end
