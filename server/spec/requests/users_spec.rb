require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'GET /show' do
    let(:user) { create(:user) }

    it 'return :ok status' do
      get "/users/#{user.id}"
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'PUT /update' do
    let(:user) { create(:user) }

    it 'return :ok status' do
      sign_in user

      put "/users/#{user.id}", params: { user: { name: 'change name user' } }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'DELETE /user' do
    let(:user) { create(:user) }

    it 'return :ok status' do
      sign_in user

      delete "/users/#{user.id}"
      expect(response).to have_http_status(:ok)
    end
  end
end
