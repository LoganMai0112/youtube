require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'enumerations' do
    it { is_expected.to define_enum_for(:role).with_values(%i[admin user]) }
  end

  describe 'associations' do
    it { is_expected.to have_one_attached(:avatar) }
    it { is_expected.to have_one_attached(:cover) }

    it { is_expected.to have_many(:videos).dependent(:destroy) }
    it { is_expected.to have_many(:likes).dependent(:destroy) }
    it { is_expected.to have_many(:comments).dependent(:destroy) }
    it { is_expected.to have_many(:subscriptions).dependent(:destroy) }
    it { is_expected.to have_many(:received_subscriptions).dependent(:destroy) }
    it { is_expected.to have_many(:subscribers) }
    it { is_expected.to have_many(:subscription_channels) }
    it { is_expected.to have_many(:streams).dependent(:destroy) }
    it { is_expected.to have_many(:user_playlists).dependent(:destroy) }
    it { is_expected.to have_many(:reports).dependent(:destroy) }
    it { is_expected.to have_many(:playlists) }
    it { is_expected.to have_many(:notifications).dependent(:destroy) }
  end

  describe 'validations' do
    subject { build(:user) }

    it { is_expected.to validate_presence_of(:role) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
  end
end
