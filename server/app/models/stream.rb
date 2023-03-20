class Stream < ApplicationRecord
  has_one_attached :source
  has_one_attached :thumbnail
  belongs_to :user

  validates :title, presence: true

  def thumbnail_url
    if thumbnail.attached?
      Rails.application.routes.url_helpers.url_for(thumbnail)
    end
  end
end
