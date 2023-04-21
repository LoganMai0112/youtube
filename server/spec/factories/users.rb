require 'open-uri'

FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "Logan#{n}" }
    sequence(:email) { |n| "logan#{n}@example.com" }
    password { 'password' }
    role { 'user' }
    # after(:build) do |user|
    #   user.avatar.attach(
    #     io: URI.parse('https://avatars.dicebear.com/api/adventurer-neutral/test.svg').open,
    #     filename: 'test'
    #   )
    # end

    trait :admin do
      role { 'admin' }
    end

    # trait :reindex do
    #   after(:create) do |user, _evaluator|
    #     user.reindex(refresh: true)
    #   end
    # end
  end
end
