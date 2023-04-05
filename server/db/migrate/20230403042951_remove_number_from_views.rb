class RemoveNumberFromViews < ActiveRecord::Migration[7.0]
  def change
    remove_column :views, :number, :integer
  end
end
