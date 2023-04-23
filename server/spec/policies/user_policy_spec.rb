require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  subject { described_class.new(user, user) }

  context 'is normal user' do
    let(:user) { create(:user) }

    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:edit) }
    it { is_expected.to permit_action(:destroy) }
  end

  context 'is admin' do
    let(:user) { create(:user, :admin) }

    it { is_expected.to permit_action(:show) }
  end
end
