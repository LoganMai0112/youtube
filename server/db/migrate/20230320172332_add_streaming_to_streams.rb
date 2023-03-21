class AddStreamingToStreams < ActiveRecord::Migration[7.0]
  def change
    add_column :streams, :streaming, :boolean
  end
end
