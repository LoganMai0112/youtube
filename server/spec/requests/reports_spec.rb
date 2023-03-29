require 'rails_helper'

RSpec.describe "Reports", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/reports/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/reports/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/reports/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
