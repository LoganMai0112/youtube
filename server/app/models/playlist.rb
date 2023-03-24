class Playlist < ApplicationRecord
  enum status: { published: 0, privated: 1 }

  has_many :playlist_items, dependent: :destroy
  has_many :videos, through: :playlist_items
  has_many :user_playlists, dependent: :destroy
  has_many :users, through: :user_playlists

  validates :title, presence: true
  validates :status, presence: true
end
