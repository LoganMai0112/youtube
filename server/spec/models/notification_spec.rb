require 'rails_helper'

RSpec.describe Notification, type: :model do
  describe 'association' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:receiver) }
    it { is_expected.to belong_to(:notifiable) }
  end
end
