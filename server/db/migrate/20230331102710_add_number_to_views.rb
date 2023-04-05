class AddNumberToViews < ActiveRecord::Migration[7.0]
  def change
    add_column :views, :number, :integer
  end
end
