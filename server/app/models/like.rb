class Like < ApplicationRecord
  belongs_to :user
  belongs_to :video, counter_cache: true
end
