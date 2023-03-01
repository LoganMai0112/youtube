require 'open-uri'
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
  devise :omniauthable, omniauth_providers: %i[facebook google_oauth2]

  has_one_attached :avatar

  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end

  def self.from_omniauth(auth)
    user = User.find_by(email: auth[:info][:email])
    if user.nil?
      user = User.create(email: auth.info.email, password: Devise.friendly_token, provider: auth.provider, uid: auth.uid, name: auth.info.name)
      avatar = URI.parse("https://avatars.dicebear.com/api/adventurer-neutral/#{auth[:info][:email]}.svg").open
      user.avatar.attach(io: avatar, filename: "#{user.name}.svg")
      return user
    elsif user.provider == auth.provider && user.uid == auth.uid
      return user
    end

    nil
  end
end
