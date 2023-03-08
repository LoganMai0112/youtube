require 'open-uri'
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  enum role: { admin: 0, user: 1 }

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
  devise :omniauthable, omniauth_providers: %i[facebook google_oauth2]

  has_one_attached :avatar
  has_many :videos, dependent: :destroy

  after_create :add_avatar_after_create

  def add_avatar_after_create
    avatar = URI.parse("https://avatars.dicebear.com/api/adventurer-neutral/#{email}.svg").open
    self.avatar.attach(io: avatar, filename: "user#{email}.svg")
  end

  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end

  def self.from_omniauth(auth)
    user = User.find_by(email: auth[:info][:email])
    if user.nil?
      user = User.create(email: auth.info.email, password: Devise.friendly_token, provider: auth.provider, uid: auth.uid, name: auth.info.name)
      return user
    elsif user.provider == auth.provider && user.uid == auth.uid
      return user
    end

    nil
  end
end
