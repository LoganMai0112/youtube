# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'json'
require 'open-uri'
require 'streamio-ffmpeg'

# Seed user
100.times.each do |_id|
  User.create!(
    name: Faker::Name.name,
    role: :user,
    email: Faker::Internet.email,
    password: Faker::Internet.password
  )
end

User.create(
  name: 'admin',
  role: :admin,
  email: 'admin@gmail.com',
  password: 'admin123'
)

user_ids = User.pluck(:id)
100.times do
  response = URI.open("https://api.pexels.com/videos/search?query=#{Faker::Food.fruits}", 'Authorization' => ENV['PEXEL_KEY'])
  json = JSON.parse(response.read)
  next unless json.present? && json['videos']&.sample.present?

  video_title = Faker::Lorem.sentence(word_count: 4)
  video_description = "<p>#{Faker::Lorem.sentence(word_count: 10)}</p>"
  video_status = 'published'
  video_url = json['videos'].sample['video_files'].first['link']

  movie = FFMPEG::Movie.new(video_url)
  path = "tmp/video-#{video_title}.mp4"
  movie_transcoded = movie.transcode(path)
  video_file = File.open(movie_transcoded.path)
  video = Video.new(title: video_title, description: video_description, status: video_status, user_id: user_ids.sample)
  video.source.attach(io: video_file, filename: "#{video_title}.mp4", content_type: 'video/mp4')
  video.save!
  video_file.close
end



