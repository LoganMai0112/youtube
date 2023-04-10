require 'rails_helper'

RSpec.describe 'Videos', type: :request do
  describe 'GET /index' do
    let(:videos) { create_list(:video, 20)}

    it 'response :success status' do
      get '/videos'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
    context 'when signed in' do
      let(:user) { create(:user) }

      it 'response :success status' do
        sign_in user
        post '/videos', params: { video: { title: 'title', user_id: user.id, source: Rack::Test::UploadedFile.new("#{Rails.root}/spec/support/attachments/output.mp4", 'video/mp4'), status: 'published' } }
        expect(response).to have_http_status(:created)
      end
    end

    context 'when have not signed in yet' do
      it 'response :unauthorized status' do
        post '/videos'
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /destroy' do
    context 'when signed in' do
      let(:user) { create(:user) }
      let(:video) { create(:video, user: user) }

      it 'response :success status' do
        sign_in user
        delete "/videos/#{video.id}"
        expect(response).to have_http_status(:success)
      end
    end

    context 'when have not signed in yet' do
      let(:user) { create(:user) }
      let(:video) { create(:video, user: user) }

      it 'response :unauthorized status' do
        delete "/videos/#{video.id}"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'UPDATE /update' do
    context 'when signed in' do
      let(:user) { create(:user) }
      let(:video) { create(:video, user: user) }

      before do
        sign_in user
        put "/videos/#{video.id}", params: { video: { title: 'update title', description: 'update description' } }
      end

      it 'response :success status' do
        expect(response).to have_http_status(:accepted)
      end
    end

    context 'when have not signed in yet' do
      let(:user) { create(:user) }
      let(:video) { create(:video, user: user) }

      it 'resonse :unauthorized status' do
        put "/videos/#{video.id}", params: { video: { title: 'update title', description: 'update description' } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET /show" do
    let(:user) { create(:user) }
    let(:video) { create(:video, user: user) }

    it 'response :success status' do
      get "/videos/#{video.id}"
      expect(response).to have_http_status(:success)
    end
  end
end
