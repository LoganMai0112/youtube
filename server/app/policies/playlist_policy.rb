class PlaylistPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def create?
    user
  end

  def update?
    user && record.user == user
  end

  def destroy?
    user && record.user == user
  end

  def show?
    user.admin? or record.user == user if record.privated?
  end
end
