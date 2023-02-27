class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self
  devise :omniauthable, omniauth_providers: %i[facebook google_oauth2]

  def self.from_omniauth(auth)
    user = User.find_by(email: auth[:info][:email])
    if user.nil?
      return User.create(email: auth.info.email, password: Devise.friendly_token, provider: auth.provider, uid: auth.uid)
    elsif user.provider == auth.provider && user.uid == auth.uid
      return user
    end
    
    return nil
  end
end
