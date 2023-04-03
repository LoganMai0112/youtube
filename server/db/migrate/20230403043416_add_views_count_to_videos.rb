class AddViewsCountToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :views_count, :integer
  end
end
