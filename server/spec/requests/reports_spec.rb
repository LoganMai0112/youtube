require 'rails_helper'

RSpec.describe 'Reports', type: :request do
  describe 'POST /create' do
    let(:user) { create(:user) }

    it 'returns http success' do
      sign_in user

      post '/reports', params: { report: { reportable_id: user.id, reportable_type: 'User', content: 'content' } }
      expect(response).to have_http_status(:success)
    end
  end

  describe 'DELETE /destroy' do
    let(:user) { create(:user, :admin) }
    let(:report) { create(:report, reportable: user) }

    it 'returns http success' do
      delete "/reports/#{report.id}"
      expect(response).to have_http_status(:ok)
    end
  end
end
