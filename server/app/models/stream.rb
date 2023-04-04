class Stream < ApplicationRecord
  has_one_attached :source
  has_one_attached :thumbnail
  has_many :notifications, as: :notifiable, dependent: :destroy
  belongs_to :user

  validates :title, presence: true

  def thumbnail_url
    Rails.application.routes.url_helpers.url_for(thumbnail) if thumbnail.attached?
  end
end
