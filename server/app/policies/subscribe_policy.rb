class SubscribePolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def create?
    user && !record.persisted? && record.subscriber == user && record.subscribed_user != user
  end

  def destroy?
    user && record.persisted? && record.subscriber == user
  end
end
