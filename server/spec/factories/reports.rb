FactoryBot.define do
  factory :report do
    reportable { nil }
    content { "MyString" }
  end
end
