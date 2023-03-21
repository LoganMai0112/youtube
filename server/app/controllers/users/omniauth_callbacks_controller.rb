# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  respond_to :json

  def facebook
    callback_by_provider('facebook')
  end

  def google_oauth2
    callback_by_provider('google_oauth2')
  end

  def callback_by_provider(provider)
    @user = User.from_omniauth(request.env['omniauth.auth'])
    if @user.nil?
      render json: {
        status: 'This email is already taken'
      }, status: :conflict
    elsif @user.persisted?
      sign_in @user
      render json: {
        code: '200',
        status: 'Logged in successfully',
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      session["devise.#{provider}_data"] = request.env['omniauth.auth'].except!(:extra)
      render json: {
        code: '422',
        status: 'Something went wrong'
      }, status: :unprocessable_entity
    end
  end
end
