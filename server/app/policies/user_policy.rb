class UserPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def show?
    record
  end

  def update?
    user && record == user
  end

  def edit?
    record == user
  end
end
