class CreateStreams < ActiveRecord::Migration[7.0]
  def change
    create_table :streams do |t|
      t.string :title
      t.text :description
      t.boolean :streaming

      t.timestamps
    end
  end
end
