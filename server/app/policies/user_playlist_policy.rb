class UserPlaylistPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def owner?
    user && record.user == user
  end

  def create?
    owner?
  end

  def destroy?
    owner?
  end
end
