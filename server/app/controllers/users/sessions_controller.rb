# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    render json: {
      code: '200',
      message: 'Logged out sucessfully'
    }, status: :ok
  end

  # POST /resource/sign_in
  # def create
  #   self.resource = warden.authenticate!(auth_options)
  #   set_flash_message!(:notice, :signed_in)
  #   sign_in(resource_name, resource)
  #   yield resource if block_given?
  #   # respond_with resource, location: after_sign_in_path_for(resource)
  #   render json: {
  #     status: 200,
  #     message: 'Logged in successfully',
  #     data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
  #   }, status: :ok
  # end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Logged in sucessfully.' },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: {
        status: { message: 'Fail to log in' }
      }, status: :unprocessable_entity
    end
  end

  def verify_signed_out_user
    if all_signed_out?
      set_flash_message! :notice, :already_signed_out

      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
