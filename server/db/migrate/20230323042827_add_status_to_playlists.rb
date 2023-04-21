class AddStatusToPlaylists < ActiveRecord::Migration[7.0]
  def change
    add_column :playlists, :status, :integer
  end
end
