require 'rails_helper'

RSpec.describe 'Streams', type: :request do
  describe 'GET /index' do
    it 'response :success status' do
      get '/streams'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
    context 'when signed in' do
      let(:user) { create(:user) }
      let(:stream) { create(:stream, user: user) }

      before { sign_in user }

      it 'response :created status' do
        post '/streams', params: { stream: {user_id: user.id, title: 'title stream'}}
        expect(response).to have_http_status(:created)
      end
    end

    context 'when not signed in' do
      let(:user) { create(:user) }
      let(:stream) { create(:stream, user: user) }

      it 'response :unauthorized status' do
        post '/streams'
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /show' do
    let(:user) { create(:user) }
    let(:stream) { create(:stream, user: user) }

    it 'response :success status' do
      get "/streams/#{stream.id}"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'PUT /update' do
    let(:user) { create(:user) }
    let(:stream) { create(:stream, user: user) }

    context 'when signed in' do
      it 'response :success status' do
        sign_in user
        put "/streams/#{stream.id}", params: { stream: { streaming: true } }
        expect(response).to have_http_status(:accepted)
      end
    end

    context 'when not signed in' do
      it 'response :unauthorized status' do
        put "/streams/#{stream.id}", params: { stream: { streaming: true } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /destroy' do
    let(:user) { create(:user) }
    let(:stream) { create(:stream, user: user) }

    context 'when signed in' do
      it 'response :success status' do
        sign_in user
        delete "/streams/#{stream.id}"
        expect(response).to have_http_status(:success)
      end
    end

    context 'when not signed in' do
      it 'respnse :unauthorized status' do
        delete "/streams/#{stream.id}"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
