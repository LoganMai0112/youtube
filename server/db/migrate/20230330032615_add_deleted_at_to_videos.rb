class AddDeletedAtToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :deleted_at, :datetime
    add_index :videos, :deleted_at
  end
end
