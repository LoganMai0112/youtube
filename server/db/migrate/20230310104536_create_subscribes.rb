class CreateSubscribes < ActiveRecord::Migration[7.0]
  def change
    create_table :subscribes do |t|
      t.bigint :subscriber_id
      t.bigint :subscribed_id

      t.timestamps
    end
  end
end
