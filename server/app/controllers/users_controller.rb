class UsersController < ApplicationController
  before_action :set_user, only: %i[show update edit destroy recover]
  before_action :authenticate_user!, only: %i[update edit destroy recover]

  def show
    videos = policy_scope(@user.videos.includes({ thumbnail_attachment: :blob }, { source_attachment: { blob: { preview_image_attachment: :blob } } }))
    streams = @user.streams.where(streaming: true).includes({ thumbnail_attachment: :blob })
    created_playlists = if @user == current_user
                          policy_scope(Playlist).joins(user_playlists: :user).where(user_playlists: { action: 'created' },
                                                                                    user: { id: @user.id })
                        else
                          policy_scope(Playlist).joins(user_playlists: :user).where(
                            user_playlists: { action: 'created' }, user: { id: @user.id }
                          ).published
                        end
    saved_playlists = policy_scope(Playlist).joins(user_playlists: :user).where(user_playlists: { action: 'saved' }, user: { id: @user.id })
    options = { params: { current_user: current_user } }
    playlist_options = { include: [:videos] }

    render json: { videos: VideoSerializer.new(videos).serializable_hash,
                   user: UserSerializer.new(@user, options).serializable_hash,
                   streams: StreamSerializer.new(streams).serializable_hash,
                   createdPlaylists: PlaylistSerializer.new(created_playlists.includes({ videos: [{ thumbnail_attachment: :blob }, { source_attachment: :blob }] }),
                                                            playlist_options).serializable_hash,
                   savedPlaylists: PlaylistSerializer.new(saved_playlists).serializable_hash }, status: :ok
  end

  def update
    if @user.update(user_params)
      render json: UserSerializer.new(@user).serializable_hash, status: :ok
    else
      render json: { message: 'Unsuccessfully updated' }, status: :internal_server_error
    end
  end

  def edit
    render json: UserSerializer.new(@user).serializable_hash, status: :ok
  end

  def destroy
    if (current_user.user? && @user.really_destroy!) || (current_user.admin? && @user.destroy)
      render json: { message: 'Deleted account' }, status: :ok
    else
      render json: { message: "Some thing went wrong, can't remove account" }, status: :internal_server_error
    end
  end

  def recover
    if @user.restore
      render json: { message: 'Succuessfully restored' }, status: :ok
    else
      render json: { message: 'Unsuccessfully restored' }, status: :internal_server_error
    end
  end

  def analytic
    if current_user.admin?
      if params[:date].present?
        sum_views = View.where('created_at > ?', 1.send(params[:date]).ago).group_by_day(:created_at).count
        top_videos = Video.where('created_at > ?', 1.send(params[:date]).ago).order(views_count: :desc).limit(10)
      else
        sum_views = View.group_by_day(:created_at).count
        top_videos = Video.order(views_count: :desc).limit(10)
      end
      render json: { sumViews: sum_views, topVideos: top_videos }, status: :ok
    else
      subscribers_channel = current_user.subscribers.group_by_day(:created_at).count
      likes_channel = Like.joins(video: :user).where(video: { user: current_user }).group_by_day(:created_at).count
      comments_channel = Comment.joins(video: :user).where(video: { user: current_user }).group_by_day(:created_at).count
      views_channel = View.joins(video: :user).where(video: { user: current_user }).group_by_day(:created_at).count
      options = { params: { current_user: current_user } }
      videos = VideoSerializer.new(Video.without_deleted.where(user: current_user).includes(:user, { thumbnail_attachment: :blob }, { source_attachment: { blob: { preview_image_attachment: :blob } } }), options).serializable_hash
      
      render json: { channelAnalytics: { subscribers_sum: subscribers_channel, likes_sum: likes_channel, comments_sum: comments_channel, views_sum: views_channel },
      videos: videos }, status: :ok
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
    authorize @user
  end

  def user_params
    params.require(:user).permit(:cover, :avatar, :name)
  end
end
