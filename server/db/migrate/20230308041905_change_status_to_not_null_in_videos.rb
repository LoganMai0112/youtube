class ChangeStatusToNotNullInVideos < ActiveRecord::Migration[7.0]
  def change
    change_column_null :videos, :status, false, "published"
  end
end
