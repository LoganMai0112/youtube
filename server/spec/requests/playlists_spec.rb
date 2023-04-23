require 'rails_helper'

RSpec.describe 'Playlists', type: :request do
  describe 'POST /create' do
    let(:user) { create(:user) }

    it 'should return :created http status' do
      sign_in user
      post "/playlists", params: { playlist: { title: 'title', status: 'published' } }
      expect(response).to have_http_status(:created)
    end
  end

  describe 'PUT /update' do
    let(:user) { create(:user) }
    let(:playlist) { create(:playlist) }
    let!(:user_playlist) { create(:user_playlist, user: user, playlist: playlist, action: 'created')}
  
    it 'return :created http status' do
      sign_in user

      put "/playlists/#{playlist.id}", params: { playlist: { title: 'change title' } }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'DELETE /update' do
    let(:user) { create(:user) }
    let(:playlist) { create(:playlist) }
    let!(:user_playlist) { create(:user_playlist, user: user, playlist: playlist, action: 'created')}
  
    it 'return :created http status' do
      sign_in user

      delete "/playlists/#{playlist.id}"
      expect(response).to have_http_status(:ok)
    end
  end
end
