class ReportPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all if user.admin?
    end
  end

  def create?
    user
  end

  def destroy?
    user.admin?
  end
end
