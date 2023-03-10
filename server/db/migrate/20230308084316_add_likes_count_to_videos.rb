class AddLikesCountToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :likes_count, :integer
  end
end
