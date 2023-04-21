class VideoSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  attributes :id, :title, :description, :video_url, :thumbnail_url, :created_at, :status, :likes_count, :comments_count, :views_count
  belongs_to :user

  attribute :liked_yet, if: proc { |_video, params|
                              params[:current_user].present?
                            } do |video, params|
    Like.find_by(video_id: video.id, user_id: params[:current_user].id)
  end

  attribute :subscribed_yet, if: proc { |_video, params|
                                   params[:current_user].present?
                                 } do |video, params|
    Subscribe.find_by(subscriber_id: params[:current_user].id, subscribed_id: video.user.id)
  end

  # attribute :views do |video|
  #   video.views.size
  # end

  attribute :deleted_yet, if: proc { |_video, params|
                                params[:current_user]&.admin?
                              } do |video, _|
    video&.deleted?
  end

  attribute :like_data, if: proc { |_video, params|
                              params[:current_user].present?
                            } do |video, _|
    video.likes.group_by_day(:created_at).count
  end

  attribute :comment_data, if: proc { |_video, params|
    params[:current_user].present?
  } do |video, _|
    video.comments.group_by_day(:created_at).count
  end

  attribute :view_data, if: proc { |_video, params|
    params[:current_user].present?
  } do |video, _|
    video.views.group_by_day(:created_at).count
  end
end
