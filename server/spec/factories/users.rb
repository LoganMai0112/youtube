require 'open-uri'

FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "Logan#{n}" }
    sequence(:email) { |n| "logan#{n}@example.com" }
    password { 'password' }
    role { 'user' }

    trait :admin do
      role { 'admin' }
    end
  end
end
