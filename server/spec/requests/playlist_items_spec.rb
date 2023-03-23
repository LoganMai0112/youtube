require 'rails_helper'

RSpec.describe "PlaylistItems", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/playlist_items/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/playlist_items/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
