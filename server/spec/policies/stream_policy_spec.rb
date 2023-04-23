require 'rails_helper'

RSpec.describe StreamPolicy, type: :policy do
  subject { described_class.new(user, stream) }

  let(:user) { create(:user, :admin) }
  let(:stream) { create(:stream, user_id: user.id) }

  it { is_expected.to permit_action(:create) }
  it { is_expected.to permit_action(:update) }
  it { is_expected.to permit_action(:destroy) }
  it { is_expected.to permit_action(:show) }
end
