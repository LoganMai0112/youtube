class UserPlaylist < ApplicationRecord
  enum action: { created: 0, saved: 1 }

  belongs_to :user
  belongs_to :playlist

  validates :action, presence: true
end
