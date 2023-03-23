class PlaylistsController < ApplicationController
  before_action :authenticate_user!

  def index 
    playlists = current_user
  end
end
