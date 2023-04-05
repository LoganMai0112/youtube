class View < ApplicationRecord
  belongs_to :video, counter_cache: true
  belongs_to :user
end
