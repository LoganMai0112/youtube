class AddCommentsCountToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :comments_count, :integer
  end
end
