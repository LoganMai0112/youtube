class AddStatusToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :status, :integer
  end
end
