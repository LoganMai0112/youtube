require 'open-uri'
class User < ApplicationRecord
  include SoftDeleteConcern
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  searchkick

  enum role: { admin: 0, user: 1 }

  after_create :add_avatar_after_create

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
  devise :omniauthable, omniauth_providers: %i[facebook google_oauth2]

  has_one_attached :avatar
  has_one_attached :cover

  has_many :videos, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :subscriptions, foreign_key: :subscriber_id, class_name: 'Subscribe', dependent: :destroy, inverse_of: :subscriber
  has_many :received_subscriptions, foreign_key: :subscribed_id, class_name: 'Subscribe', dependent: :destroy, inverse_of: :subscribed_user
  has_many :subscribers, through: :received_subscriptions, source: :subscriber
  has_many :subscription_channels, through: :subscriptions, source: :subscribed_user
  has_many :streams, dependent: :destroy
  has_many :user_playlists, dependent: :destroy
  has_many :playlists, through: :user_playlists
  has_many :reports, as: :reportable, dependent: :destroy

  validates :role, presence: true
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  def add_avatar_after_create
    avatar = URI.parse("https://avatars.dicebear.com/api/adventurer-neutral/#{email}.svg").open
    self.avatar.attach(io: avatar, filename: "user#{email}.svg")
  end

  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end

  def cover_url
    Rails.application.routes.url_helpers.url_for(cover) if cover.attached?
  end

  def self.from_omniauth(auth)
    user = User.find_by(email: auth[:info][:email])
    if user.nil?
      user = User.create(email: auth.info.email, password: Devise.friendly_token, provider: auth.provider, uid: auth.uid, name: auth.info.name, role: 'user')
      return user
    elsif user.provider == auth.provider && user.uid == auth.uid
      return user
    end

    nil
  end
end
