class UserPlaylistPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def create?
    user && record.user == user
  end

  def destroy?
    user && record.user == user
  end
end
