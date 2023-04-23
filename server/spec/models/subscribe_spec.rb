require 'rails_helper'

RSpec.describe Subscribe, type: :model do
  describe 'assocation' do
    it { is_expected.to belong_to(:subscriber) }
    it { is_expected.to belong_to(:subscribed_user) }
  end
end
