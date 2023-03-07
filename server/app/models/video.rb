class Video < ApplicationRecord
  has_one_attached :source
  has_one_attached :thumbnail
  belongs_to :user

  def video_url
    Rails.application.routes.url_helpers.url_for(source) if source.attached?
  end

  def thumbnail_url
    Rails.application.routes.url_helpers.url_for(thumbnail) if thumbnail.attached?
  end
end
