FactoryBot.define do
  factory :video do
    title { 'MyString' }
    description { 'MyText' }
    user { nil }
    status { 'published' }

    after(:build) do |video|
      video_file = File.open('tmp/output.mp4')
      video.source.attach(io: video_file, filename: 'video/mp4')
    end
  end
end
