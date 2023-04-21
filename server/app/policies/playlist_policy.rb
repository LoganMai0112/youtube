class PlaylistPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      if user&.admin? || user
        scope.all
      else
        scope.published
      end
    end
  end

  def owner?
    user && record.user_playlists.find_by(action: 'created').user == user
  end

  def create?
    user
  end

  def update?
    owner?
  end

  def destroy?
    owner?
  end

  def show?
    if record.privated?
      user.admin? || owner?
    else
      record
    end
  end
end
