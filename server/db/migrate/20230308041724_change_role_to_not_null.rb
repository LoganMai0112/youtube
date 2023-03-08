class ChangeRoleToNotNull < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :role, false, "user"
  end
end
