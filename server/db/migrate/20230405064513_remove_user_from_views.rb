class RemoveUserFromViews < ActiveRecord::Migration[7.0]
  def change
    remove_column :views, :user_id
  end
end
