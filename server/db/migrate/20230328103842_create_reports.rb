class CreateReports < ActiveRecord::Migration[7.0]
  def change
    create_table :reports do |t|
      t.references :reportable, polymorphic: true, null: false
      t.string :content

      t.timestamps
    end
  end
end
