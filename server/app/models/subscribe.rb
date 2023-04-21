class Subscribe < ApplicationRecord
  belongs_to :subscriber, class_name: 'User', inverse_of: :subscriptions
  belongs_to :subscribed_user, foreign_key: :subscribed_id, class_name: 'User', inverse_of: :received_subscriptions
end
