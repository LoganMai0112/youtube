# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'streamio-ffmpeg'

10.times do
  video_title = Faker::Lorem.sentence(word_count: 4)
  video_description = "<p>#{Faker::Lorem.sentence(word_count: 10)}</p>"
  video_status = 'published'

  movie = FFMPEG::Movie.new('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4')
  path = "tmp/video-#{video_title}.mp4"
  movie_transcoded = movie.transcode(path, { video_codec: 'libx264', audio_codec: 'aac' })
  video_file = File.open(movie_transcoded.path)
  video = Video.new(title: video_title, description: video_description, status: video_status, user_id: User.first.id)
  video.source.attach(io: video_file, filename: "#{video_title}.mp4", content_type: 'video/mp4')
  video.save!
  video_file.close
end
