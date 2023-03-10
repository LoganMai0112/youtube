class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :video, counter_cache: true

  validates :content, presence: true
end

