class Playlist < ApplicationRecord
  enum status: { published: 0, privated: 1 }

  has_many :playlist_items, dependent: :destroy
  has_many :videos, through: :playlist_items
  has_many :user_playlists, dependent: :destroy
  has_many :users, through: :user_playlists

  validates :title, presence: true
  validates :status, presence: true

  def thumbnail_url
    return Rails.application.routes.url_helpers.url_for(videos.first.thumbnail) if videos.first.thumbnail.attached?

    Rails.application.routes.url_helpers.url_for(videos.first.source.preview(resize_to_limit: [300, 300]).processed)
  end
end
