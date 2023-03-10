class PopulateVideoLikesCount < ActiveRecord::Migration[7.0]
  def change
    Video.find_each do |video|
      Video.reset_counters(video.id, :likes)
    end
  end
end
