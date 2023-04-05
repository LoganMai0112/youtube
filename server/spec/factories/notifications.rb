FactoryBot.define do
  factory :notification do
    user { nil }
    receiver_id { 1 }
    notifiable { nil }
  end
end
