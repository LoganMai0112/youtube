class AddUserToStreams < ActiveRecord::Migration[7.0]
  def change
    add_reference :streams, :user, null: false, foreign_key: true
  end
end
