require 'rails_helper'

RSpec.describe 'Subscribes', type: :request do
  describe 'POST /create' do
    let(:user) { create(:user) }
    let(:user2) { create(:user) }

    it 'return :created http status' do
      sign_in user

      post "/users/#{user2.id}/subscribe"
      expect(response).to have_http_status(:created)
    end
  end

  describe 'DELETE /destroy' do
    let(:user) { create(:user) }
    let(:user2) { create(:user) }
    let!(:subscribe) { create(:subscribe, subscriber: user, subscribed_user: user2) }

    it 'return :ok http status' do
      sign_in user

      delete "/users/#{user2.id}/subscribe"
      expect(response).to have_http_status(:ok)
    end
  end
end
