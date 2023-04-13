require 'rails_helper'

RSpec.describe 'PlaylistItems', type: :request do
  describe 'POST /create' do
    let(:user) { create(:user, role: 'admin') }
    let(:video) { create(:video, user: user) }
    let(:playlist) { create(:playlist) }

    it 'returns http success' do
      sign_in user
      post "/playlists/#{playlist.id}/playlist_item", params: { playlist_id: playlist.id, video_id: video.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe 'DELETE /destroy' do
    let(:playlist) { create(:playlist) }
    let(:user) { create(:user, role: 'admin') }
    let(:video) { create(:video, user: user) }
    let!(:playlist_item) { create(:playlist_item, playlist: playlist, video: video) }

    it 'returns http success' do
      sign_in user
      delete "/playlists/#{playlist.id}/playlist_item", params: { video_id: video.id, playlist_id: playlist.id }
      expect(response).to have_http_status(:success)
    end
  end
end
