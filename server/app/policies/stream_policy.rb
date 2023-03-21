class StreamPolicy < ApplicationPolicy
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
    user.admin? or record.user == user
  end

  def destroy?
    user.admin? or record.user == user
  end

  def show?
    record
  end
end
