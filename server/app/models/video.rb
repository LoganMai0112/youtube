class Video < ApplicationRecord
  searchkick
  
  enum status: { only_me: 0, published: 1 }
  has_one_attached :source
  has_one_attached :thumbnail
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  belongs_to :user

  validates :source, presence: true

  def video_url
    Rails.application.routes.url_helpers.url_for(source) if source.attached?
  end

  def thumbnail_url
    if thumbnail.attached?
      Rails.application.routes.url_helpers.url_for(thumbnail)
    else
      Rails.application.routes.url_helpers.url_for(source.preview(resize_to_limit: [300, 300]).processed)
    end
  end
end
