require 'rails_helper'

RSpec.describe 'Views', type: :request do
  describe 'GET /update' do
    it 'returns http success' do
      get '/views/update'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /show' do
    it 'returns http success' do
      get '/views/show'
      expect(response).to have_http_status(:success)
    end
  end
end
