class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      # t.integer :user_id
      # t.integer :group_id
      # t.text :message
      # t.string :image
      t.string :content
      t.string :image
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
