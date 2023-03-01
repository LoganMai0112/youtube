class Video < ApplicationRecord
  has_one_attached :source
  belongs_to :user

  def video_url
    Rails.application.routes.url_helpers.url_for(source) if source.attached?
  end
end
