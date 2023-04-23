require 'rails_helper'

RSpec.describe VideoPolicy, type: :policy do
  subject { described_class.new(user, video) }

  context 'is normal user' do
    let(:user) { create(:user) }
    let(:video) { create(:video, user: user) }

    it { is_expected.to permit_action(:create) }
    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:destroy) }
    it { is_expected.to permit_action(:show) }
  end

  context 'is admin' do
    let(:user) { create(:user, :admin) }
    let(:video) { create(:video, user: user) }

    it { is_expected.to permit_action(:recover) }
  end
end
