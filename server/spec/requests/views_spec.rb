require 'rails_helper'

RSpec.describe 'Views', type: :request do
  describe 'POST /create' do
    let(:user) { create(:user) }
    let(:video) { create(:video, user: user) }

    it 'returns http success' do
      post "/videos/#{video.id}/view"
      expect(response).to have_http_status(:success)
    end
  end
end
