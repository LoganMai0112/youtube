FactoryBot.define do
  factory :user_playlist do
    action { 'created' }
    user { nil }
    playlist { nil }
  end
end
