class Video < ApplicationRecord
  include SoftDeleteConcern

  searchkick

  enum status: { privated: 0, published: 1 }
  has_one_attached :source
  has_one_attached :thumbnail
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :playlist_item, dependent: :destroy
  has_many :reports, as: :reportable, dependent: :destroy
  has_many :views, dependent: :destroy

  has_many :notifications, as: :notifiable, dependent: :destroy
  belongs_to :user

  validates :source, presence: true
  validates :title, presence: true

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
