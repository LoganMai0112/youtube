require 'rails_helper'

RSpec.describe 'UserPlaylists', type: :request do
  describe 'POST /create' do
    let(:user) { create(:user) }
    let(:playlist) { create(:playlist) }

    it 'return :ok http status' do
      sign_in user

      post "/playlists/#{playlist.id}/user_playlist"
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'DELETE /destroy' do
    let(:user) { create(:user) }
    let(:playlist) { create(:playlist) }
    let!(:user_playlist) { create(:user_playlist, user: user, playlist: playlist, action: 'saved') }

    it 'return :ok http status' do
      sign_in user

      delete "/playlists/#{playlist.id}/user_playlist", params: { playlist_id: playlist.id }
      expect(response).to have_http_status(:ok)
    end
  end
end
