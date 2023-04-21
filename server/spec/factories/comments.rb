FactoryBot.define do
  factory :comment do
    user { nil }
    video { nil }
    content { 'MyString' }
  end
end
