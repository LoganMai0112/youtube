class PlaylistItemPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def owner?
    user.admin? or (user && UserPlaylist.find_by(user: user, playlist: record.playlist).created? && record.video.published?)
  end

  def create?
    owner?
  end

  def destroy?
    owner?
  end
end
